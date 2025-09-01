# 📝 Note-Taking App

A full-stack note-taking application built with **React**, **Node.js (Express)**, **TypeScript**, **MongoDB**, and **JWT Authentication**, supporting both **OTP-based** and **Google login**.

---

## Live Demo

https://notes-app-sepia-iota.vercel.app/

---

## Project Structure

```
/frontend       → Frontend (React + TypeScript)
/backend        → Backend (Node.js + Express + MongoDB)
```

---

## Features

* **User Signup via Email + OTP**
* **Login via Email + OTP**
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
PORT=
DB_URI=
JWT_SECRET=
REACT_APP_URL=
EMAIL_USER=
EMAIL_PASS=


```
### Frontend (`.env`)

```env
VITE_BACKEND_URL=
```

---

## API Endpoints

### Auth Routes

| Method | Endpoint                         | Description          |
| ------ | ---------------------------------| -------------------- |
| POST   | `/api/auth/signup/request-otp`   | Request OTP to email |
| POST   | `/api/auth/login/request-otp`    | Request OTP to email |
| POST   | `/api/auth/signup/verify-otp`    | Verify OTP and login |
| POST   | `/api/auth/login/verify-otp`     | Verify OTP and login |
| GET    | `/api/auth/me`                   | Get current user     |

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
git clone https://github.com/your-username/Notes-app.git
cd Notes-app
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
npm npm run dev
```

---

## Commit Structure

Each feature was developed and committed step-by-step. Example commits:

* `feat: add OTP request and verify routes`
* `feat: implement Google login`
* `fix: JWT middleware bug`
* `chore: add Zod validation`

---

## Notes

* Please ensure you use a secure and verified sender address when sending OTP emails.
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

