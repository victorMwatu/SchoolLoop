# server/models.py
from enum import Enum as PyEnum
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

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
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.Enum(RoleEnum), default=RoleEnum.STUDENT, nullable=False)

    # relationships
    assignments = db.relationship("Assignment", backref="creator", lazy=True)
    notes = db.relationship("Note", backref="creator", lazy=True)

    def __repr__(self):
        return f"<User {self.email}>"

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
