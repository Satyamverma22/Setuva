# Knowledge Preservation Platform - Backend Phase 1

This is the backend API for Phase 1 of the **Knowledge Preservation Platform**. It provides a robust, asynchronous REST API built using FastAPI, MongoDB (via Motor), and Pydantic v2. It includes user registration, authentication (JWT), profiles, and basic CRUD operations for knowledge entries (text-only).

---

## Tech Stack
- **Python**: 3.11+ (Tested on Python 3.13)
- **FastAPI**: Modern, high-performance web framework for APIs.
- **MongoDB**: Document database.
- **Motor**: Async Python driver for MongoDB.
- **Pydantic v2**: Data validation and settings management.
- **python-jose & passlib**: Secure JWT authentication and bcrypt password hashing.

---

## Folder Structure
```
backend/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── models/
│   │   ├── user.py
│   │   └── knowledge_entry.py
│   ├── routers/
│   │   ├── auth.py
│   │   ├── users.py
│   │   └── knowledge.py
│   ├── core/
│   │   ├── security.py
│   │   └── dependencies.py
│   └── services/
│       ├── auth_service.py
│       └── knowledge_service.py
├── .env.example
├── requirements.txt
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Python 3.11+ installed.
- MongoDB running locally (default: `mongodb://localhost:27017`) or a remote MongoDB Atlas connection string.

### 1. Initialize Virtual Environment
Navigate to the `backend` directory and run:
```bash
python -m venv venv
```
Activate the virtual environment:
- **Windows (PowerShell)**:
  ```powershell
  .\venv\Scripts\Activate.ps1
  ```
- **Windows (CMD)**:
  ```cmd
  .\venv\Scripts\activate.bat
  ```
- **macOS / Linux**:
  ```bash
  source venv/bin/activate
  ```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Configuration
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Update the `.env` file with your database URI and a secure JWT secret key.

### 4. Running the Dev Server
Run the dev server using Uvicorn:
```bash
uvicorn app.main:app --reload
```
The server will start at `http://127017:8000` (or `http://127.0.0.1:8000`).

---

## API Documentation & Testing
FastAPI automatically generates interactive Swagger documentation.
- Open your browser and navigate to: **`http://127.0.0.1:8000/docs`**
- Click **Authorize** at the top right, enter your JWT access token if testing protected routes, or use the registration/login endpoints to generate a token first.

---

## Endpoints

### 1. Health Check
- **`GET /health`**
  - Description: Check backend service status.
  - Response:
    ```json
    { "status": "ok" }
    ```

### 2. Authentication
- **`POST /auth/register`**
  - Description: Create a new user account.
  - Request Body:
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "password": "securepassword",
      "role": "contributor"
    }
    ```
  - Response:
    ```json
    {
      "user": {
        "id": "64b0f023ac952b1b36c7a31b",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "contributor",
        "created_at": "2026-07-15T10:00:00Z"
      },
      "access_token": "eyJhbGciOiJIUzI1NiIsIn...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsIn...",
      "token_type": "bearer"
    }
    ```

- **`POST /auth/login`**
  - Description: Authenticate and get tokens.
  - Request Body:
    ```json
    {
      "email": "jane@example.com",
      "password": "securepassword"
    }
    ```
  - Response:
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsIn...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsIn...",
      "token_type": "bearer"
    }
    ```

- **`POST /auth/refresh`**
  - Description: Exchange refresh token for a new access token.
  - Request Body:
    ```json
    {
      "refresh_token": "eyJhbGciOiJIUzI1NiIsIn..."
    }
    ```
  - Response:
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsIn...",
      "token_type": "bearer"
    }
    ```

### 3. Users (Protected)
- **`GET /users/me`**
  - Description: Get authenticated user details.
  - Headers: `Authorization: Bearer <access_token>`
  - Response:
    ```json
    {
      "id": "64b0f023ac952b1b36c7a31b",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "contributor",
      "created_at": "2026-07-15T10:00:00Z"
    }
    ```

### 4. Knowledge Entries
- **`POST /knowledge` (Protected)**
  - Description: Create a new knowledge entry (defaults to "draft").
  - Headers: `Authorization: Bearer <access_token>`
  - Request Body:
    ```json
    {
      "title": "Traditional Farming Techniques",
      "description": "A guide on soil rotation and natural irrigation methods.",
      "category": "Agriculture"
    }
    ```
  - Response:
    ```json
    {
      "id": "64b0f0a4ac952b1b36c7a31c",
      "contributor_id": "64b0f023ac952b1b36c7a31b",
      "title": "Traditional Farming Techniques",
      "description": "A guide on soil rotation and natural irrigation methods.",
      "category": "Agriculture",
      "status": "draft",
      "created_at": "2026-07-15T10:05:00Z",
      "updated_at": "2026-07-15T10:05:00Z"
    }
    ```

- **`GET /knowledge` (Public)**
  - Description: List knowledge entries with filtering and pagination.
  - Query Params:
    - `category`: e.g. `Agriculture` (Optional)
    - `contributor_id`: e.g. `64b0f023ac952b1b36c7a31b` (Optional)
    - `skip`: default `0` (Optional)
    - `limit`: default `20` (Optional)
  - Response:
    ```json
    [
      {
        "id": "64b0f0a4ac952b1b36c7a31c",
        "contributor_id": "64b0f023ac952b1b36c7a31b",
        "title": "Traditional Farming Techniques",
        "description": "A guide on soil rotation and natural irrigation methods.",
        "category": "Agriculture",
        "status": "draft",
        "created_at": "2026-07-15T10:05:00Z",
        "updated_at": "2026-07-15T10:05:00Z"
      }
    ]
    ```

- **`GET /knowledge/{id}` (Public)**
  - Description: Retrieve a single entry.
  - Response:
    ```json
    {
      "id": "64b0f0a4ac952b1b36c7a31c",
      "contributor_id": "64b0f023ac952b1b36c7a31b",
      "title": "Traditional Farming Techniques",
      "description": "A guide on soil rotation and natural irrigation methods.",
      "category": "Agriculture",
      "status": "draft",
      "created_at": "2026-07-15T10:05:00Z",
      "updated_at": "2026-07-15T10:05:00Z"
    }
    ```

- **`PUT /knowledge/{id}` (Protected)**
  - Description: Update own knowledge entry.
  - Headers: `Authorization: Bearer <access_token>`
  - Request Body:
    ```json
    {
      "title": "Advanced Soil Techniques",
      "category": "Agriculture"
    }
    ```
  - Response:
    ```json
    {
      "id": "64b0f0a4ac952b1b36c7a31c",
      "contributor_id": "64b0f023ac952b1b36c7a31b",
      "title": "Advanced Soil Techniques",
      "description": "A guide on soil rotation and natural irrigation methods.",
      "category": "Agriculture",
      "status": "draft",
      "created_at": "2026-07-15T10:05:00Z",
      "updated_at": "2026-07-15T10:10:00Z"
    }
    ```

- **`DELETE /knowledge/{id}` (Protected)**
  - Description: Delete own knowledge entry.
  - Headers: `Authorization: Bearer <access_token>`
  - Response: HTTP 204 No Content
