# server/app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Parent, Teacher, Student, Assignment

import os

# --- Initialize App ---
app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))  # /.../SchoolLoop/server
db_path = os.path.join(basedir, "..", "instance", "app.db")  # /.../SchoolLoop/instance/app.db
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# --- Initialize DB ---
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# --- Models ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    role = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Parent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120))
    phone = db.Column(db.String(20))

class Teacher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120))
    subject = db.Column(db.String(50))

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120))
    student_class = db.Column(db.String(10))
    user_id = db.Column(db.Integer)
    parent_id = db.Column(db.Integer)

class Assignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    description = db.Column(db.Text)
    student_id = db.Column(db.Integer)
    teacher_id = db.Column(db.Integer)

# --- Routes ---
@app.route("/")
def home():
    return {"status": "ok", "message": "SchoolLoop backend is running"}

@app.route("/students", methods=["GET"])
def get_students():
    students = Student.query.all()
    return jsonify([{
        "id": s.id,
        "name": s.name,
        "email": s.email,
        "class": s.student_class
    } for s in students])


@app.route("/teachers", methods=["GET"])
def get_teachers():
    teachers = Teacher.query.all()
    return jsonify([{
        "id": t.id,
        "name": t.name,
        "email": t.email,
        "subject": t.subject
    } for t in teachers])

@app.route("/parents", methods=["GET"])
def get_parents():
    parents = Parent.query.all()
    return jsonify([{
        "id": p.id,
        "name": p.name,
        "email": p.email,
        "phone": p.phone
    } for p in parents])

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        return jsonify({"message": "Login successful", "role": user.role})
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route("/assignments", methods=["GET"])
def get_assignments():
    assignments = Assignment.query.all()
    return jsonify([{
        "id": a.id,
        "title": a.title,
        "description": a.description,
        "student_id": a.student_id,
        "teacher_id": a.teacher_id
    } for a in assignments])

# --- Create tables and seed demo data ---
if __name__ == "__main__":
    with app.app_context():   # <-- this is the key
        db.create_all()

                  # Seed Parents + linked User
        if not Parent.query.first():
            parent_user = User(username="parent1", role="parent", email="parent1@parent.com")
            parent_user.set_password("secret123")
            db.session.add(parent_user)
            db.session.flush()  # get parent_user.id before commit

            parent_profile = Parent(
                name="Mrs. Nyambura",
                email="nyambura@parent.com",
                phone="0712345678",
                user_id=parent_user.id
            )
            db.session.add(parent_profile)
            db.session.commit()
            print("✅ Parent + user seeded.")

        # Seed Teachers + linked User
        if not Teacher.query.first():
            teacher_user = User(username="teacher1", role="teacher", email="teacher1@school.com")
            teacher_user.set_password("secret123")
            db.session.add(teacher_user)
            db.session.flush()

            teacher_profile = Teacher(
                name="Ms. Wanjiku",
                email="wanjiku@school.com",
                subject="Math",
                user_id=teacher_user.id
            )
            db.session.add(teacher_profile)
            db.session.commit()
            print("✅ Teacher + user seeded.")

        # Seed Students + linked User
        if not User.query.first():
            demo_user = User(username="teacher1", role="teacher", email="teacher1@school.com")
            demo_user.set_password("secret123")
            db.session.add(demo_user)
            db.session.commit()
            print("✅ Demo user seeded.")


    # finally, start the app
app.run(debug=True, use_reloader=False, host="0.0.0.0", port=5000)
