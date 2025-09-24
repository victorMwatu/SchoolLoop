from app import app, db, User, Student, UserRole
from werkzeug.security import generate_password_hash

if __name__ == "__main__":
    with app.app_context():
        db.session.query(Student).delete()
        db.session.query(User).delete()

        teacher = User(
            name="Beatrice",
            email="beatrice@example.com",
            password_hash=generate_password_hash("pass123"),
            role=UserRole.TEACHER
        )

        student = Student(
            name="Alice Johnson",
            student_class="Grade 10",
            user=teacher
        )

        db.session.add_all([teacher, student])
        db.session.commit()
        print("✅ Seeded demo user (Beatrice) and student (Alice).")
