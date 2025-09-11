# KMRL Snapshot Backend API

Backend API service for the KMRL Stakeholder Portal snapshot management system.

## Features

- RESTful API for snapshot management
- Department management
- Input validation with Joi
- Error handling and logging
- Rate limiting and security
- CORS support
- Health check endpoint

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Snapshots
- `GET /api/v1/snapshots` - Get all snapshots (with filtering)
- `GET /api/v1/snapshots/stats` - Get snapshot statistics
- `GET /api/v1/snapshots/:id` - Get specific snapshot
- `POST /api/v1/snapshots` - Create new snapshot
- `PUT /api/v1/snapshots/:id` - Update snapshot
- `DELETE /api/v1/snapshots/:id` - Delete snapshot
- `PATCH /api/v1/snapshots/:id/status` - Update snapshot status

### Departments
- `GET /api/v1/departments` - Get all departments
- `GET /api/v1/departments/:id` - Get specific department

## Query Parameters

### GET /api/v1/snapshots
- `department` - Filter by department
- `risk` - Filter by risk level (high, medium, low)
- `status` - Filter by status (new, in-progress, completed)
- `search` - Search in title, description, and tags

## Request/Response Examples

### Create Snapshot
```bash
POST /api/v1/snapshots
Content-Type: application/json

{
  "title": "New Safety Issue",
  "description": "Description of the safety issue",
  "risk": "high",
  "departments": ["Safety", "Operations"],
  "tags": ["Safety", "Urgent"],
  "dueDate": "2025-01-15",
  "owner": "Safety Officer",
  "confidence": "High Confidence",
  "summary": "Brief summary of the issue",
  "actionItems": [
    {
      "responsible": "Safety Manager",
      "task": "Investigate the issue",
      "deadline": "by 2025-01-10"
    }
  ]
}
```

### Response
```json
{
  "success": true,
  "message": "Snapshot created successfully",
  "data": {
    "id": "uuid-here",
    "title": "New Safety Issue",
    "description": "Description of the safety issue",
    "risk": "high",
    "departments": ["Safety", "Operations"],
    "tags": ["Safety", "Urgent"],
    "dueDate": "2025-01-15",
    "owner": "Safety Officer",
    "confidence": "High Confidence",
    "summary": "Brief summary of the issue",
    "status": "new",
    "priority": 4,
    "createdAt": "2025-01-09T10:00:00.000Z",
    "updatedAt": "2025-01-09T10:00:00.000Z",
    "createdBy": "system",
    "assignedTo": [],
    "actionItems": [...],
    "evidence": [],
    "traceability": []
  }
}
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `ALLOWED_ORIGINS` - CORS allowed origins
- `RATE_LIMIT_WINDOW_MS` - Rate limiting window
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window

## Development

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

## Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation
- Error handling without stack traces in production

## Data Storage

Currently uses in-memory storage. For production, replace with a proper database (MongoDB, PostgreSQL, etc.).