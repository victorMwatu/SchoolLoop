from app import app, db
from models import Student

with app.app_context():
    # Create only the Student table
    Student.__table__.create(db.engine, checkfirst=True)
    print("✅ Student table created (without User).")
