# server/models.py
from flask_sqlalchemy import SQLAlchemy
import enum

# ✅ Define db here
db = SQLAlchemy()

# Enum for roles
class UserRole(enum.Enum):
    STUDENT = "STUDENT"
    TEACHER = "TEACHER"
    PARENT = "PARENT"

class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False)

    # One-to-one with Student (later you can make it one-to-many)
    student_profile = db.relationship("Student", back_populates="user", uselist=False)

    def to_dict(self):
     return {
        "id": self.id,
        "name": self.name,
        "student_class": self.student_class,
        "teacher_id": self.user_id
    }

    

class Student(db.Model):
    __tablename__ = 'students'  
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    student_class = db.Column(db.String(50), nullable=False)
                              
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User", back_populates="student_profile")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "class": self.student_class,
            "user_id": self.user_id
        }