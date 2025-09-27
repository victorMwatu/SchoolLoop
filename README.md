# SchoolLoop
### School Diary/ Parent-Teacher-Student Communication System

A comprehensive web-based school management platform designed to streamline communication and academic management between students, parents, and teachers. SchoolLoop serves as a digital school diary and communication hub, facilitating seamless interaction within the educational community.

## Overview

SchoolLoop addresses the common challenges in school communication by providing a centralized platform where all stakeholders can access relevant information, track academic progress, and maintain effective communication channels. The application supports three distinct user roles, each with tailored interfaces and functionalities to meet their specific needs.

## Features

### Authentication & User Management
- Secure user registration and authentication system
- Role-based access control for students, parents, and teachers
- Profile management and account settings
- Password reset and account recovery options

### Assignment Management
- Teachers can create, assign, and manage homework and projects
- Students can view assigned tasks with due dates and requirements
- Assignment submission system with file upload capabilities
- Progress tracking and completion status indicators
- Grade management and feedback system

### Communication System
- Direct messaging between teachers and parents
- Announcement broadcast functionality for school-wide communications
- Real-time chat capabilities for immediate communication needs
- Message history and conversation threading
- Notification system for important updates

### School Calendar Integration
- Centralized calendar showing school events, holidays, and important dates
- Assignment due dates integration
- Personal calendar features for individual scheduling
- Event reminders and notifications
- Academic year planning and term schedules

### Dashboard Interfaces
- **Student Dashboard**: Assignment overview, grades, messages, and calendar
- **Teacher Dashboard**: Class management, assignment creation, student progress, and parent communication
- **Parent Dashboard**: Child's academic progress, teacher communications, and school updates

## Technical Architecture

SchoolLoop is built using modern web technologies with a clear separation between frontend and backend services:

### Backend (Flask REST API)
- **Framework**: Python Flask with RESTful API design
- **Database**: SQLite for development with migration support
- **Authentication**: Secure session management and user authentication
- **Data Models**: Comprehensive database schema supporting all application features
- **API Endpoints**: Well-structured REST endpoints for all frontend interactions

### Frontend (React Application)
- **Framework**: React with modern hooks and functional components
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: CSS modules with a comprehensive design system
- **State Management**: React Context API for global state management
- **Routing**: Client-side routing for seamless navigation

## Project Structure

```
schoolloop/
├── server/                 # Flask backend application
│   ├── app/
│   │   ├── models.py      # Database models and schemas
│   │   ├── resources.py   # API resource handlers
│   │   └── routes.py      # URL routing configuration
│   ├── migrations/        # Database migration files
│   └── main.py           # Application entry point
├── client/                # React frontend application
│   ├── src/
│   │   ├── components/   # React components organized by feature
│   │   └── styles/       # CSS stylesheets and design system
│   └── public/           # Static assets and HTML template
└── instance/             # Database and configuration files
```

## Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn package manager

## Development Workflow

### Running Both Services
For development, you'll need to run both the backend and frontend servers simultaneously:

1. Start the Flask backend server in one terminal
2. Start the React development server in another terminal
3. The frontend will proxy API requests to the backend automatically

### Database Management
The application uses Flask-Migrate for database schema management:

- Create a new migration: `flask db migrate -m "description"`
- Apply migrations: `flask db upgrade`
- Downgrade migrations: `flask db downgrade`

### Code Organization
- Backend code follows Flask best practices with blueprints and resource-based organization
- Frontend components are organized by feature and include corresponding CSS files
- Shared styles are maintained in the design system for consistency

## Deployment

### Production URLs
- Frontend Application: https://schoolloop-front.onrender.com/
- Backend API: https://schoolloop-2.onrender.com

### Deployment Configuration
The application is configured for deployment on cloud platforms with environment-specific settings for production, staging, and development environments.

## Future Enhancements

Planned features and improvements include:
- Mobile application development
- Advanced analytics and reporting
- Integration with external educational tools
- Multi-language support
- Enhanced notification system
- Offline functionality

## Support and Documentation

For technical support or questions about SchoolLoop, please refer to the project documentation or contact the development team.

## Authors

- **Reggan Nzuki** - Full-stack development and system architecture
- **Beatrice Mwenje** - Frontend development and user experience design  
- **Victor Nzioka Mwatu** - Full-stack developer and database design

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

SchoolLoop represents a modern approach to educational technology, bringing together the essential tools needed for effective school communication and academic management in a single, user-friendly platform.