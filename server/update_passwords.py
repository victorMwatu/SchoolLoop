from werkzeug.security import generate_password_hash
import sqlite3

# Connect to your SQLite database
conn = sqlite3.connect("instance/app.db")
cur = conn.cursor()

# Hash the passwords
teacher_pw = generate_password_hash("secret123")
student_pw = generate_password_hash("secret123")
parent_pw = generate_password_hash("secret123")

# Update the users
cur.execute("UPDATE user SET password_hash=? WHERE username='teacher1'", (teacher_pw,))
cur.execute("UPDATE user SET password_hash=? WHERE username='student1'", (student_pw,))
cur.execute("UPDATE user SET password_hash=? WHERE username='parent1'", (parent_pw,))

conn.commit()
conn.close()
print("Passwords updated successfully!")
