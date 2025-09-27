from flask import Flask
from app.models import db, User, RoleEnum  # import from app/models.py
from app import create_app, db

app = create_app()   

with app.app_context():
    db.create_all()


def create_app():
    app = Flask(__name__)

    # Database config
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///schoolloop.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize database
    db.init_app(app)

    # TEST ROUTES (Day 1)
   
    @app.route("/")
    def home():
        return "Backend is running!"

    @app.route("/student")
    def student_route():
        return "This is a Student route ✅"

    @app.route("/teacher")
    def teacher_route():
        return "This is a Teacher route ✅"

    @app.route("/parent")
    def parent_route():
        return "This is a Parent route ✅"

    @app.route("/admin")
    def admin_route():
        return "This is an Admin route ✅"

    return app


# Run the app
if __name__== "__main__":
    app = create_app()

    with app.app_context():
        db.create_all()  # create tables from models.py

    app.run(debug=True)

