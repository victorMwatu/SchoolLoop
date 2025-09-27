# server/app/routes.py
from flask_restful import Api
from app.resources import SignupResource, LoginResource, AssignmentResource, AssignmentSubmissionResource, ParentConfirmationResource, CalendarEventResource

def register_resources(api: Api):
    # Auth routes
    api.add_resource(SignupResource, "/api/auth/signup")
    api.add_resource(LoginResource, "/api/auth/login")
    # Assignment routes
    api.add_resource(AssignmentResource, "/api/assignments")
    api.add_resource(AssignmentSubmissionResource, "/api/assignment_submissions")
    api.add_resource(ParentConfirmationResource, "/api/parent_confirmations")
    # Calendar events route
    api.add_resource(CalendarEventResource, "/api/calendar_events")