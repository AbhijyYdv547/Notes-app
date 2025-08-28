# 📝 Note-Taking App

A full-stack note-taking application built with **React**, **Node.js (Express)**, **TypeScript**, **MongoDB**, and **JWT Authentication**, supporting both **OTP-based** and **Google login**.

---

## Live Demo

[Live URL Here](https://your-deployment-url.com)
(Replace with actual deployed link)

---

## Project Structure

```
/frontend       → Frontend (React + TypeScript)
/backend        → Backend (Node.js + Express + MongoDB)
```

---

## Features

* **User Signup via Email + OTP**
* **Login via Google OAuth**
* **JWT-based authentication**
* **Create, Get, View, and Delete Notes**
* **Input validation using Zod**
* **Mobile-friendly frontend UI (based on provided design assets)**
* **Deployed to the cloud**

---

## Tech Stack

### Frontend:

* React (TypeScript)
* TailwindCSS (or your preferred styling framework)
* Axios

### Backend:

* Node.js
* Express
* TypeScript
* MongoDB + Mongoose
* Zod for validation
* JWT for auth
* Google OAuth2
* Nodemailer (for OTP email)

---

## Environment Variables

### Backend (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REACT_APP_URL=http://localhost:3000

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google
```

> ⚠️ Never commit `.env` files to version control.

---

## API Endpoints

### Auth Routes

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| POST   | `/api/auth/request-otp` | Request OTP to email |
| POST   | `/api/auth/verify-otp`  | Verify OTP and login |
| POST   | `/api/auth/google`      | Google OAuth login   |
| GET    | `/api/auth/me`          | Get current user     |

### Notes Routes

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| POST   | `/api/notes/create` | Create a new note  |
| GET    | `/api/notes/`       | Get all user notes |
| GET    | `/api/notes/:id`    | Get note by ID     |
| DELETE | `/api/notes/:id`    | Delete note by ID  |

---

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/note-taking-app.git
cd note-taking-app
```

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Run the app

#### Start backend

```bash
cd backend
npm run dev
```

#### Start frontend

```bash
cd ../frontend
npm start
```

---

## Commit Structure

Each feature was developed and committed step-by-step. Example commits:

* `feat: add OTP request and verify routes`
* `feat: implement Google login`
* `fix: JWT middleware bug`
* `chore: add Zod validation`

---

## Screenshots

*(Add screenshots of your UI and API responses if possible)*

---

## Notes

* Please ensure you use a secure and verified sender address when sending OTP emails.
* Only users who signed up via Google can log in via Google.
* JWT is stored in HTTP-only cookies for security.

---

## Assignment Info

> This project was submitted as part of an assignment for **Highway Delite**.

---

## 🌐 Deployment

Deployed on:

* Frontend: Vercel 
* Backend: Render 
* Database: MongoDB Atlas

---

## Future Improvements

* Edit notes functionality
* Add tags and categories
* Search and filter
* Dark mode

---
