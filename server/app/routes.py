from app.resources import StudentListResource, StudentResource

def register_resources(api):
    api.add_resource(StudentListResource, "/api/students")
    api.add_resource(StudentResource, "/api/students/<int:student_id>")
