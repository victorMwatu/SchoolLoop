# SchoolLoop

A web-based school management platform for students, parents, and teachers.

## Features
- User authentication (students, parents, teachers)
- Assignment management and submissions
- Messaging between parents and teachers
- Academic progress tracking
- School calendar with events and holidays

## Project Structure
- `server/` — Flask REST API backend (Python)
- `client/` — React frontend (JavaScript)

## Getting Started

### Backend Setup (Flask)
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   pipenv install
   ```
3. Set up the database:
   ```bash
   flask db upgrade
   ```
4. Run the backend server:
   ```bash
   flask run
   ```

### Frontend Setup (React)
1. Navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Usage
- Access the frontend at `http://localhost:5173` (default Vite port)
- The backend API runs at `http://localhost:5000`

## License
This project is licensed under the MIT License.