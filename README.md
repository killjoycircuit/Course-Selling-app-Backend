# 🎓 Course Selling Platform - Backend

This is the backend server for a course-selling platform built using **Node.js**, **Express**, and **MongoDB**. It provides functionality for **user and admin registration/login**, **course creation and purchase**, and **role-based access control** to ensure secure access to resources.

---

## 🚀 Features

- ✅ **JWT Authentication** for both **Users** and **Admins**
- 🔐 **Protected Routes** using middleware and **Role Validation**
- 🎓 **Admins** can create, edit, and delete courses
- 🛒 **Users** can view and purchase courses
- 📦 **MongoDB + Mongoose** for robust and scalable data handling
- 🗂️ Well-structured code with MVC pattern
- 🌱 **Environment variables** managed via `.env`

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Authentication:** JSON Web Tokens (JWT)  
- **Environment Management:** dotenv  
- **Password Hashing:** bcrypt  
- **Validation & Middleware:** Custom Express Middleware

---


## 📁 Project Structure

```text
course-selling-backend/
├── middlewares/
│   ├── user.js
│   └── admin.js
├── models/
│   ├── User.js
│   ├── Admin.js
│   └── Course.js
├── routes/
│   ├── user.js
│   ├── admin.js
│   └── course.js
├── .env
├── .gitignore
├── package.json
├── index.js
└── README.md
