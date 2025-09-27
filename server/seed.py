# server/seed.py
from app import create_app, db
from app.models import User, Classroom, Assignment, Note, Message, Conversation, AssignmentSubmission, CalendarEvent
from datetime import datetime, timedelta

def seed():
    app = create_app()
    with app.app_context():
        # Drop and recreate tables
        db.drop_all()
        db.create_all()

        # --- Users ---
        teacher = User(name="Alice Teacher", email="alice@example.com", role="teacher")
        teacher.set_password("password123")

        student = User(name="Bob Student", email="bob@example.com", role="student")
        student.set_password("password123")

        parent = User(name="Charlie Parent", email="charlie@example.com", role="parent")
        parent.set_password("password123")

        admin = User(name="Dana Admin", email="dana@example.com", role="admin")
        admin.set_password("password123")

        db.session.add_all([teacher, student, parent, admin])
        db.session.commit()

        # --- Classroom ---
        classroom = Classroom(name="Math 101")
        db.session.add(classroom)
        db.session.commit()

        # --- Assignment ---
        assignment = Assignment(
            title="Algebra Homework",
            description="Solve 10 equations",
            due_date=datetime.utcnow() + timedelta(days=7),
            classroom_id=classroom.id,
            created_by=teacher.id
        )
        db.session.add(assignment)
        db.session.commit()

        # --- Assignment Submission ---
        submission = AssignmentSubmission(
            assignment_id=assignment.id,
            student_id=student.id,
            content="My homework answers",
            is_done=True
        )
        db.session.add(submission)
        db.session.commit()

        # --- Note ---
        note = Note(content="Bob did well in class today.", created_by=teacher.id)
        db.session.add(note)
        db.session.commit()

        # --- Conversation & Messages ---
        conversation = Conversation(user1_id=teacher.id, user2_id=student.id)
        db.session.add(conversation)
        db.session.commit()

        message1 = Message(
            sender_id=teacher.id,
            receiver_id=student.id,
            conversation_id=conversation.id,
            subject="Homework Reminder",
            content="Don’t forget to finish your algebra homework!",
        )
        db.session.add(message1)
        db.session.commit()

        # --- Calendar Event ---
        event = CalendarEvent(
            title="Parent-Teacher Meeting",
            description="Discussion about student progress.",
            date=datetime.utcnow().date(),
            end_date=datetime.utcnow().date(),
            type="meeting",
            time="10:00 AM",
            location="Room 12",
            is_important=True
        )
        db.session.add(event)
        db.session.commit()

        print("✅ Database seeded successfully!")

if __name__ == "__main__":
    seed()
