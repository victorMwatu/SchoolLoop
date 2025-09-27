# server/app/resources.py
from flask_restful import Resource
from flask import request
from app import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models import User, Assignment, AssignmentSubmission, CalendarEvent
from datetime import datetime
# Calendar Event Resource

class CalendarEventResource(Resource):
    @jwt_required()
    def get(self):
        # Optionally filter by month/year/type
        month = request.args.get('month')
        year = request.args.get('year')
        event_type = request.args.get('type')
        query = CalendarEvent.query
        if month and year:
            try:
                month = int(month)
                year = int(year)
                query = query.filter(db.extract('month', CalendarEvent.date) == month,
                                    db.extract('year', CalendarEvent.date) == year)
            except Exception:
                pass
        if event_type:
            query = query.filter_by(type=event_type)
        events = query.order_by(CalendarEvent.date.asc()).all()
        return [e.to_dict() for e in events], 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        try:
            event = CalendarEvent(
                title=data.get('title'),
                description=data.get('description'),
                date=datetime.fromisoformat(data.get('date')).date() if data.get('date') else None,
                end_date=datetime.fromisoformat(data.get('endDate')).date() if data.get('endDate') else None,
                type=data.get('type'),
                time=data.get('time'),
                location=data.get('location'),
                is_important=data.get('isImportant', False)
            )
            db.session.add(event)
            db.session.commit()
            return event.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 400

class AssignmentResource(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        title = data.get("title")
        description = data.get("description")
        due_date = data.get("due_date")
        classroom_id = data.get("classroom_id")
        created_by = get_jwt_identity()
        if not title or not classroom_id:
            return {"msg": "Missing required fields"}, 400
        assignment = Assignment(
            title=title,
            description=description,
            due_date=datetime.fromisoformat(due_date) if due_date else None,
            classroom_id=classroom_id,
            created_by=created_by
        )
        db.session.add(assignment)
        db.session.commit()
        return assignment.id, 201

    @jwt_required()
    def get(self):
        # List all assignments (optionally filter by classroom or teacher)
        classroom_id = request.args.get("classroom_id")
        query = Assignment.query
        if classroom_id:
            query = query.filter_by(classroom_id=classroom_id)
        assignments = query.all()
        return [
            {
                "id": a.id,
                "title": a.title,
                "description": a.description,
                "due_date": a.due_date.isoformat() if a.due_date else None,
                "classroom_id": a.classroom_id,
                "created_by": a.created_by,
                "created_at": a.created_at.isoformat() if a.created_at else None
            }
            for a in assignments
        ], 200

# Assignment Submission Resource
class AssignmentSubmissionResource(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        assignment_id = data.get("assignment_id")
        content = data.get("content")
        student_id = get_jwt_identity()
        if not assignment_id:
            return {"msg": "Missing assignment_id"}, 400
        submission = AssignmentSubmission(
            assignment_id=assignment_id,
            student_id=student_id,
            content=content,
            is_done=True,
            submitted_at=datetime.utcnow()
        )
        db.session.add(submission)
        db.session.commit()
        return submission.to_dict(), 201

    @jwt_required()
    def get(self):
        
        try:
            assignment_id = request.args.get("assignment_id")
            student_id = request.args.get("student_id")
            query = AssignmentSubmission.query
            if assignment_id:
                query = query.filter_by(assignment_id=assignment_id)
            if student_id:
                query = query.filter_by(student_id=student_id)
            submissions = query.all()
            return [s.to_dict() for s in submissions], 200
        except Exception as e:
            import traceback
            print("[ERROR] AssignmentSubmissionResource.get:", str(e))
            traceback.print_exc()
            return {"error": str(e)}, 500

# Parent Confirmation Resource
class ParentConfirmationResource(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        submission_id = data.get("submission_id")
        parent_id = get_jwt_identity()
        submission = AssignmentSubmission.query.get(submission_id)
        if not submission:
            return {"msg": "Submission not found"}, 404
        submission.parent_checked = True
        submission.parent_checked_at = datetime.utcnow()
        submission.parent_id = parent_id
        db.session.commit()
        return {"msg": "Parent confirmed assignment"}, 200

class SignupResource(Resource):
    def post(self):
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role", "student")

        if not name or not email or not password:
            return {"msg": "Missing required fields"}, 400

        if User.query.filter_by(email=email).first():
            return {"msg": "Email already registered"}, 400

        if len(password) < 6:
            return {"msg": "Password must be at least 6 characters"}, 400

        new_user = User(name=name, email=email, role=role)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        token = create_access_token(identity=new_user.id, additional_claims={"role": new_user.role})
        return {
            "msg": "User created successfully",
            "access_token": token,
            "role": new_user.role,
            "user_id": new_user.id,
            "name": new_user.name
        }, 201


class LoginResource(Resource):
    def post(self):
        try:
            data = request.get_json()
            email = data.get("email")
            password = data.get("password")

            user = User.query.filter_by(email=email).first()
            if not user or not user.check_password(password):
                return {"msg": "Invalid email or password"}, 401

            token = create_access_token(identity=user.id, additional_claims={"role": user.role})
            return {
                "msg": "Login successful",
                "access_token": token,
                "role": user.role,
                "user_id": user.id,
                "name": user.name  
            }, 200
        except Exception as e:
            print("Login error:", str(e))  
            return {"msg": "Server error during login"}, 500

class MessageResource(Resource):
    @jwt_required()
    def get(self):
        # Get conversations for the current user
        current_user_id = get_jwt_identity()
        
        # Get all conversations where user is involved
        conversations = Conversation.query.filter(
            (Conversation.user1_id == current_user_id) | 
            (Conversation.user2_id == current_user_id)
        ).all()
        
        conversations_data = []
        total_unread = 0
        
        for conv in conversations:
            # Determine the other participant
            other_user = conv.user2 if conv.user1_id == current_user_id else conv.user1
            
            # Count unread messages in this conversation
            unread_count = Message.query.filter(
                Message.conversation_id == conv.id,
                Message.receiver_id == current_user_id,
                Message.is_read == False
            ).count()
            
            total_unread += unread_count
            
            conversations_data.append({
                "id": conv.id,
                "participantId": other_user.id,
                "participantName": other_user.name,
                "participantRole": other_user.role,
                "lastMessage": conv.last_message.content if conv.last_message else "No messages yet",
                "lastMessageDate": conv.last_message_at.isoformat() if conv.last_message_at else conv.created_at.isoformat(),
                "unreadCount": unread_count
            })
        
        return {
            "conversations": conversations_data,
            "unreadCount": total_unread
        }, 200

class SendMessageResource(Resource):
    @jwt_required()
    def post(self):
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        receiver_id = data.get("receiver_id")
        subject = data.get("subject")
        content = data.get("content")
        message_type = data.get("message_type", "general")
        priority = data.get("priority", "normal")
        
        if not all([receiver_id, subject, content]):
            return {"msg": "Missing required fields"}, 400
        
        # Check if receiver exists
        receiver = User.query.get(receiver_id)
        if not receiver:
            return {"msg": "Receiver not found"}, 404
        
        # Find or create conversation
        conversation = Conversation.query.filter(
            ((Conversation.user1_id == current_user_id) & (Conversation.user2_id == receiver_id)) |
            ((Conversation.user1_id == receiver_id) & (Conversation.user2_id == current_user_id))
        ).first()
        
        if not conversation:
            conversation = Conversation(user1_id=current_user_id, user2_id=receiver_id)
            db.session.add(conversation)
            db.session.flush()  # Get the conversation ID
        
        # Create message
        message = Message(
            sender_id=current_user_id,
            receiver_id=receiver_id,
            conversation_id=conversation.id,
            subject=subject,
            content=content,
            message_type=message_type,
            priority=priority
        )
        
        # Update conversation last message
        conversation.last_message_id = message.id
        conversation.last_message_at = datetime.utcnow()
        
        db.session.add(message)
        db.session.commit()
        
        return {
            "msg": "Message sent successfully",
            "messageId": message.id,
            "conversationId": conversation.id
        }, 201

class MarkAsReadResource(Resource):
    @jwt_required()
    def put(self, message_id):
        current_user_id = get_jwt_identity()
        
        message = Message.query.filter_by(id=message_id, receiver_id=current_user_id).first()
        if not message:
            return {"msg": "Message not found"}, 404
        
        message.is_read = True
        db.session.commit()
        
        return {"msg": "Message marked as read"}, 200

class ConversationMessagesResource(Resource):
    @jwt_required()
    def get(self, conversation_id):
        current_user_id = get_jwt_identity()
        
        # Verify user is part of conversation
        conversation = Conversation.query.filter_by(id=conversation_id).filter(
            (Conversation.user1_id == current_user_id) | 
            (Conversation.user2_id == current_user_id)
        ).first()
        
        if not conversation:
            return {"msg": "Conversation not found"}, 404
        
        messages = Message.query.filter_by(conversation_id=conversation_id).order_by(Message.created_at.asc()).all()
        
        messages_data = []
        for msg in messages:
            messages_data.append({
                "id": msg.id,
                "senderId": msg.sender_id,
                "senderName": msg.sender.name,
                "senderRole": msg.sender.role,
                "content": msg.content,
                "messageType": msg.message_type,
                "isRead": msg.is_read,
                "createdAt": msg.created_at.isoformat()
            })
        
        return {"messages": messages_data}, 200

class UsersResource(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        
        # Get all users except the current user
        users = User.query.filter(User.id != current_user_id).all()
        
        users_data = []
        for user in users:
            users_data.append({
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            })
        
        return {"users": users_data}, 200