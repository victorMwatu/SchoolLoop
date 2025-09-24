from app import app, db
from models import Student

with app.app_context():
    # Clear existing students if you want a clean slate
    db.session.query(Student).delete()

    # Add demo students
    s1 = Student(name="Alice Johnson", student_class="Grade 10")
    s2 = Student(name="Bob Smith", student_class="Grade 11")
    s3 = Student(name="Charlie Kim", student_class="Grade 12")

    db.session.add_all([s1, s2, s3])
    db.session.commit()

    print("✅ Seeded demo students.")
