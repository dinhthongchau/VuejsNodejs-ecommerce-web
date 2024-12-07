## **Backend API Setup Guide**

### **Steps to Set Up the Project**

1. **Create the Database**
   - Open your MySQL client and create a database named `ct313h_projects`:
     ```sql
     CREATE DATABASE ct313h_projects;
     ```

2. **Configure Environment Variables**
   - Navigate to the `backend` folder.
   - Copy the file `env.example` and rename it to `.env`:
     ```bash
     cp env.example .env
     ```
   - Open `.env` and configure your **SendGrid** email settings:
     - Go to [SendGrid](https://sendgrid.com/) to get your API key.
     - Add the following to your `.env` file:
       ```env
       SENDGRID_API_KEY=your_sendgrid_api_key
       EMAIL_FROM=your_email@example.com
       ```

3. **Install Dependencies**
   - Run the following command to install all required dependencies for both **frontend** and **backend**:
     ```bash
     npm install
     ```

4. **Seed the Database with Sample Data**
   - Populate the database with initial data by running:
     ```bash
     npx knex seed:run all
     ```

5. **Start the Server**
   - Start the backend server using:
     ```bash
     npm run start
     ```

---

### **Notes**
- Ensure that your MySQL server is running before creating the database.
- Verify that the `.env` file contains the correct database connection and SendGrid email configurations.
- If you face dependency issues, try deleting the `node_modules` folder and re-running `npm install`.
