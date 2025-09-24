# server/app/resources.py
from flask import request
from flask_restful import Resource
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app import db
from models import User, RoleEnum


class SignupResource(Resource):
    def post(self):
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role", RoleEnum.STUDENT.value)

        if not all([name, email, password]):
            return {"msg": "Missing required fields"}, 400

        if User.query.filter_by(email=email).first():
            return {"msg": "Email already registered"}, 400

        new_user = User(
            name=name,
            email=email,
            password_hash=generate_password_hash(password),
            role=RoleEnum(role),
        )
        db.session.add(new_user)
        db.session.commit()

        return {"msg": "User created successfully"}, 201


class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"msg": "Missing email or password"}, 400

        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            return {"msg": "Invalid credentials"}, 401

        token = create_access_token(identity={"id": user.id, "role": user.role.value})
        return {"access_token": token, "role": user.role.value, "user_id": user.id}, 200