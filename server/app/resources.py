from flask_restful import Resource
from flask import request
from app import db
from app.models import Student

class StudentResource(Resource):
    def get(self, student_id):
        student = Student.query.get_or_404(student_id)
        return student.to_dict()

    def delete(self, student_id):
        student = Student.query.get_or_404(student_id)
        db.session.delete(student)
        db.session.commit()
        return {"message": "Student deleted"}

class StudentListResource(Resource):
    def get(self):
        students = Student.query.all()
        return [s.to_dict() for s in students]

    def post(self):
        data = request.get_json()
        new_student = Student(name=data["name"])
        db.session.add(new_student)
        db.session.commit()
        return new_student.to_dict(), 201
