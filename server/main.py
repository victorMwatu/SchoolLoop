import os
from app import create_app

# Create app
app = create_app()

# Run locally only if executed directly
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # Render provides PORT
    app.run(host="0.0.0.0", port=port)
