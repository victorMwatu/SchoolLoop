# server/app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_jwt_extended import JWTManager
import os
from flask_cors import CORS

# Initialize extensions

db = SQLAlchemy()
migrate = Migrate()
api = Api()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    # Database config
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "DATABASE_URL",
        f"sqlite:///{os.path.join(BASE_DIR, '..', 'app.db')}"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # JWT config
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret-key")

    # Initialize extensions
    CORS(app, origins=["https://schoolloop-front.onrender.com"])
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Import models so migrations detect them
    from app import models  

    # Register resources (API endpoints)
    from app.routes import register_resources
    register_resources(api)

    api.init_app(app)

    return app
