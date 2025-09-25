from app import app, db, Student

with app.app_context():
    db.drop_all()
    db.create_all()

    students = [
        Student(name='Alice Johnson', email='alice@example.com', student_class='Grade 10'),
        Student(name='Bob Smith', email='bob@example.com', student_class='Grade 11'),
        Student(name='Charlie Lee', email='charlie@example.com', student_class='Grade 9'),
        Student(name='Diana King', email='diana@example.com', student_class='Grade 12'),
        Student(name='Ethan Ray', email='ethan@example.com', student_class='Grade 10'),
        Student(name='Fiona Cruz', email='fiona@example.com', student_class='Grade 11'),
    ]

    for s in students:
        db.session.add(s)

    db.session.commit()
    print("✅ Seeded database with demo students.")
