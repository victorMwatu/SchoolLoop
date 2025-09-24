# server/app/resources.py
from flask_restful import Resource
from flask import request
from app import db
from app.models import User
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
            "user_id": new_user.id
        }, 201


class LoginResource(Resource):
    def post(self):
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
            "user_id": user.id
        }, 200
