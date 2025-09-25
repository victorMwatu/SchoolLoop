# server/routes.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from models import db, User, Teacher, Student, Parent

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = generate_password_hash(data.get("password"))
    role = data.get("role")

    # Prevent duplicate email
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    # Create base user
    user = User(username=username, email=email, password=password, role=role)
    db.session.add(user)
    db.session.commit()

    # Role-specific records
    if role == "teacher":
        teacher = Teacher(id=user.id, subject=data.get("subject"))
        db.session.add(teacher)
    elif role == "student":
        student = Student(id=user.id, grade=data.get("grade"))
        db.session.add(student)
    elif role == "parent":
        parent = Parent(id=user.id)
        db.session.add(parent)

    db.session.commit()
    return jsonify({"message": f"{role} registered successfully!"}), 201
