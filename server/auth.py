from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import db, User, UserRole  # Ensure UserRole is imported

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', '').upper()  # Convert to uppercase

    if not all([name, email, password, role]):
        return jsonify(error='Missing required fields'), 400

    if User.query.filter_by(email=email).first():
        return jsonify(error='Email already registered'), 409

    try:
        user = User(name=name, email=email, role=UserRole[role])  # Validate enum
    except KeyError:
        return jsonify(error='Invalid role. Must be STUDENT, TEACHER, or PARENT'), 400

    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify(message='User created successfully'), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify(error='Missing credentials'), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify(error='Invalid email or password'), 401

    token = create_access_token(identity={'id': user.id, 'role': user.role.name})
    return jsonify(token=token, role=user.role.name), 200

@auth_bp.route('/test', methods=['GET'])
def test():
    return jsonify(message='SchoolLoop backend is working!'), 200
