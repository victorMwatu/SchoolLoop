# server/create_db.py
from app import app, db
from models import User, Parent, Teacher, Student, Assignment

with app.app_context():
    db.create_all()  # This will create all tables in app.db

    # Seed Parents
    if not Parent.query.first():
        parents = [
            Parent(name="Mrs. Nyambura", email="nyambura@parent.com", phone="0712345678"),
            Parent(name="Mr. Otieno", email="otieno@parent.com", phone="0723456789"),
        ]
        db.session.add_all(parents)
        db.session.commit()

    # Seed Teachers
    if not Teacher.query.first():
        teachers = [
            Teacher(name="Ms. Wanjiku", email="wanjiku@school.com", subject="Math"),
            Teacher(name="Mr. Mwangi", email="mwangi@school.com", subject="Science"),
        ]
        db.session.add_all(teachers)
        db.session.commit()

    # Seed Students
    if not Student.query.first():
        students = [
            Student(name="Winnie", email="winnie@student.com", student_class="8A"),
            Student(name="Betty", email="betty@student.com", student_class="8B"),
            Student(name="Victor", email="victor@student.com", student_class="8C"),
            Student(name="Reggan", email="reggan@student.com", student_class="8D"),
            Student(name="Amina", email="amina@student.com", student_class="8E"),
        ]
        db.session.add_all(students)
        db.session.commit()

    print("✅ Database created and seeded successfully!")
