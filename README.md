# 🔥 Firebase CRUD Task App

A protected Task Management web application built with **Next.js**, **TypeScript**, **Firebase Authentication**, and **Firestore**.  
Users can securely register, log in, and manage personal tasks (Create, Read, Update, Delete).



## 📖 Project Description

This project demonstrates authentication and data management using Firebase with a Next.js frontend.  
Only logged-in users can access the dashboard and perform CRUD operations on their own tasks.

---

## ⚙️ Features

✅ Firebase Authentication (Register, Login, Logout)  
✅ Protected Routes (only logged-in users can access the dashboard)  
✅ CRUD Operations on Firestore (Create, Read, Update, Delete tasks)  
✅ Personalized Greeting (shows logged-in user's email)  
✅ Task fields include title, description, priority, and completion status  
✅ TypeScript interfaces for type safety  
✅ Responsive UI with dark mode support  

---

## 🧠 Learning Objectives

- Integrate Firebase Authentication and Firestore with Next.js  
- Manage user authentication state  
- Implement CRUD operations securely  
- Protect routes for authenticated users  
- Handle async operations safely using TypeScript  

---

## 🏗️ Technologies Used

- **Next.js 14+**
- **React 18+**
- **TypeScript**
- **Firebase Authentication**
- **Cloud Firestore**
- **Tailwind CSS**

---

## ⚡ Firebase Firestore Structure

Collection: `tasks`

| Field       | Type     | Description                        |
|--------------|----------|------------------------------------|
| id           | string   | Firestore document ID              |
| title        | string   | Task title                         |
| description  | string   | Task details                       |
| completed    | boolean  | Task completion status              |
| priority     | string   | "Low" \| "Medium" \| "High"        |
| userEmail    | string   | Owner of the task (from Auth user) |

---

## 🔐 Firestore Security Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, update, delete: if request.auth != null && request.auth.token.email == resource.data.userEmail;
      allow create: if request.auth != null && request.auth.token.email == request.resource.data.userEmail;
    }
  }
}
```
🧑‍💻 Authentication Flow
Register

Users sign up with email and password

Successful registration redirects to Login page

Login

Users log in with email and password

Redirects to the Dashboard

Logout

Users can log out from the Dashboard

Redirects back to the Login page

🗂️ CRUD Features

Create: Add new task (title, description, priority)

Read: Display user-specific tasks

Update: Edit task details or toggle completion

Delete: Remove a task from Firestore

🧪 Testing Account

Use the following credentials for testing:

Email: daniella@gmail.com
Password: 123456

📸 Screenshots
🔐 Login Page


🏠 Dashboard Page
<img width="1865" height="843" alt="loginpage" src="https://github.com/user-attachments/assets/8ea4b90b-c5dc-42cd-8b79-ce87b9ef148c" />




