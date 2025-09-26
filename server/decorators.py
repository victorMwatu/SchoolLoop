from functools import wraps
from flask import request, jsonify
from models import User

def require_role(role):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            user_id = request.headers.get('X-User-ID')
            user = User.query.get(user_id)
            if not user or user.role != role:
                return jsonify({'error': 'Unauthorized'}), 403
            return f(*args, **kwargs)
        return wrapper
    return decorator
