import os
from app import create_app, db

# Create Flask app
app = create_app()

# Create tables if they don't exist
with app.app_context():
    db.create_all()

# For local testing only
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use Render port if set
    app.run(host="0.0.0.0", port=port)
