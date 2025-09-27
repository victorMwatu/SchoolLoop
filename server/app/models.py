# server/models.py
from enum import Enum as PyEnum
from flask_sqlalchemy import SQLAlchemy
from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


# Role Enum
class RoleEnum(PyEnum):
    STUDENT = "student"
    TEACHER = "teacher"
    PARENT  = "parent"
    ADMIN   = "admin"

# User Model
class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default="student")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role
        }

# Classroom Model
class Classroom(db.Model):
    __tablename__ = "classrooms"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    # one-to-many with assignments
    assignments = db.relationship("Assignment", backref="classroom", lazy=True)

# Assignment Model
class Assignment(db.Model):
    __tablename__ = "assignments"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    due_date = db.Column(db.DateTime, nullable=True)

    classroom_id = db.Column(db.Integer, db.ForeignKey("classrooms.id"), nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Note Model
class Note(db.Model):
    __tablename__ = "notes"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    acknowledged = db.Column(db.Boolean, default=False)

    created_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Message(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    conversation_id = db.Column(db.Integer, db.ForeignKey("conversations.id"), nullable=False)  
    subject = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    message_type = db.Column(db.String(50), default="general")
    priority = db.Column(db.String(20), default="normal")
    is_read = db.Column(db.Boolean, default=False)
    requires_acknowledgment = db.Column(db.Boolean, default=False)
    acknowledged = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    sender = db.relationship("User", foreign_keys=[sender_id], backref="sent_messages")
    receiver = db.relationship("User", foreign_keys=[receiver_id], backref="received_messages")

class Conversation(db.Model):
    __tablename__ = "conversations"
    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    last_message_id = db.Column(db.Integer, db.ForeignKey("messages.id"), nullable=True)
    last_message_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user1 = db.relationship("User", foreign_keys=[user1_id])
    user2 = db.relationship("User", foreign_keys=[user2_id])
    last_message = db.relationship("Message", foreign_keys=[last_message_id])
    

# AssignmentSubmission Model
class AssignmentSubmission(db.Model):
    __tablename__ = "assignment_submissions"

    id = db.Column(db.Integer, primary_key=True)
    assignment_id = db.Column(db.Integer, db.ForeignKey("assignments.id"), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=True)  # e.g., file link or text
    is_done = db.Column(db.Boolean, default=False)
    parent_checked = db.Column(db.Boolean, default=False)
    parent_checked_at = db.Column(db.DateTime, nullable=True)
    parent_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "assignment_id": self.assignment_id,
            "student_id": self.student_id,
            "submitted_at": self.submitted_at,
            "content": self.content,
            "is_done": self.is_done,
            "parent_checked": self.parent_checked,
            "parent_checked_at": self.parent_checked_at,
            "parent_id": self.parent_id
        }

# CalendarEvent model for school calendar integration
class CalendarEvent(db.Model):
    __tablename__ = 'calendar_events'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date)
    type = db.Column(db.String(50))  # e.g., meeting, holiday, event, exam, academic
    time = db.Column(db.String(50))
    location = db.Column(db.String(120))
    is_important = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date.isoformat() if self.date else None,
            'endDate': self.end_date.isoformat() if self.end_date else None,
            'type': self.type,
            'time': self.time,
            'location': self.location,
            'isImportant': self.is_important
        }