from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS
import enum

# --- App setup ---
app = Flask(__name__)
CORS(app)  # enable CORS *after* app is created

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# --- Models ---
class UserRole(enum.Enum):
    STUDENT = "student"
    TEACHER = "teacher"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False)

    students = db.relationship("Student", backref="user", lazy=True)

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    student_class = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "student_class": self.student_class,
            "teacher_id": self.user_id
        }

# --- Routes ---
@app.route("/")
def index():
    return "SchoolLoop API is running ✅"

@app.route("/api/students")
def get_students():
    students = Student.query.all()
    return jsonify([s.to_dict() for s in students])

@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify({"error": str(e)}), 500

# --- Entry point ---
if __name__ == "__main__":
    app.run(debug=True)
