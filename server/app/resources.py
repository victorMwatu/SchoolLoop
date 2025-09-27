# server/app/resources.py
from flask_restful import Resource
from flask import request
from app import db
from app.models import User, Assignment, AssignmentSubmission, CalendarEvent
# Calendar Event Resource
from flask_jwt_extended import jwt_required
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
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
# Assignment CRUD Resource
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
        # List submissions for a student or assignment
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
from flask_jwt_extended import create_access_token

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
                "name": user.name  # Make sure this line is correct
            }, 200
        except Exception as e:
            print("Login error:", str(e))  # Add this to see backend errors
            return {"msg": "Server error during login"}, 500