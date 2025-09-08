# 🎓 Course Selling Platform - Backend

This is the backend server for a course-selling platform built using **Node.js**, **Express**, and **MongoDB**. It provides functionality for **user and admin registration/login**, **course creation and purchase**, and **role-based access control** to ensure secure access to resources.

---

## 🚀 Features

- ✅ **JWT Authentication** for both **Users** and **Admins**
- 🔐 **Protected Routes** using middleware and **Role Validation**
- 🎓 **Admins** can create, edit, and delete courses
- 🛒 **Users** can view and purchase courses
- 📦 **MongoDB + Mongoose** for robust and scalable data handling
---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Authentication:** JWT  
- **Environment Management:** dotenv  
- **Password Hashing:** bcrypt  
- **Validation & Middleware:** Custom Middleware

---


## 📁 Project Structure

```text
course-selling-backend/
├── middleware/
│   ├── auth.js
│   └── role.js
├── routes/
│   ├── admin.js
│   ├── user.js
│   └── course.js
├── .gitignore
├── README.md
├── db.js
├── index.js
├── package.json
├── package-lock.json

