# **E-Commerce Project: Selling iPhone**

This project includes a **frontend** built with Vue.js and a **backend** built with Node.js, Express, and MySQL. Follow the instructions below to set up the application.

Video youtube demo: https://youtu.be/BY-JZOygIGg
---

## **Prerequisites**
- Node.js installed (>= v14)
- MySQL installed
- [SendGrid](https://sendgrid.com/) account for email configuration

---

## **Backend Setup**

### 1. **Create the Database**
- Create a database named `ct313h_projects` in MySQL.

### 2. **Configure Environment Variables**
- Navigate to the `backend` folder.
- Rename the `env.example` file to `.env`:
  ```bash
  mv env.example .env
  
- Open `.env` and configure the following:
  - Database connection.
  - SendGrid API details (obtain your API key from [SendGrid](https://sendgrid.com/)).

### 3. **Install Dependencies**
- Run the following command in the `backend` folder:
  ```bash
  npm install
  ```

### 4. **Seed Data**
- Populate the database with seed data:
  ```bash
  npx knex seed:run
  ```

### 5. **Run the Backend Server**
- Start the backend server:
  ```bash
  npm run start
  ```

---

## **Frontend Setup**

### 1. **Configure Environment Variables**
- Navigate to the `frontend` folder.
- Rename the `env.example` file to `.env`:
  ```bash
  cp env.example .env
  ```
- Open `.env` and configure the following:
  ```env
  VITE_API_URL=http://localhost:3300/api
  VITE_URL=http://localhost:3300
  VITE_EMAIL_ADMIN_RECEIVE_ORDER=thongb2111955@student.ctu.edu.vn
  ```

### 2. **Install Dependencies**
- Run the following command in the `frontend` folder:
  ```bash
  npm install
  ```

### 3. **Run the Frontend Development Server**
- Start the frontend development server:
  ```bash
  npm run dev
  ```

---

## **Access the Application**

- **Frontend:** Open your browser at the URL provided in the terminal after running the frontend server. Example:
  ```
  http://localhost:5173
  ```
- **Backend API:** Ensure the backend server is running and accessible at:
  ```
  http://localhost:3300/api
  ```

---

## **Additional Notes**
- Ensure both the frontend and backend are configured to communicate with each other.
- Use the same `VITE_API_URL` in the frontend `.env` as the backend's base API URL.

