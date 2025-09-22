# server/models.py
from enum import Enum as PyEnum
from flask_sqlalchemy import SQLAlchemy

# create the SQLAlchemy object
db = SQLAlchemy()

# Use a different name for the Python Enum to avoid confusion
class RoleEnum(PyEnum):
    STUDENT = "student"
    TEACHER = "teacher"
    PARENT  = "parent"
    ADMIN   = "admin"

class User(db.Model):                # <-- IMPORTANT: db.Model (capital M)
    _tablename_ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.Enum(RoleEnum), default=RoleEnum.STUDENT, nullable=False)

    def _repr_(self):
        return f"<User {self.email}>"