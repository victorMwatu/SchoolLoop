# server/app/routes.py
from flask_restful import Api
from app.resources import SignupResource, LoginResource

def register_resources(api: Api):
    # Auth routes
    api.add_resource(SignupResource, "/api/auth/signup")
    api.add_resource(LoginResource, "/api/auth/login")