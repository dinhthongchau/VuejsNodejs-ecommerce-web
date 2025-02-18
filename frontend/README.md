### **Frontend Setup Guide**

#### **Steps to Set Up the Frontend**

1. **Configure Environment Variables**  
   - Navigate to the `frontend` folder.  
   - Copy the file `env.example` and rename it to `.env`:  
     ```bash
     cp env.example .env
     ```
   - Open `.env` and configure :  
     ```env
     VITE_API_URL=http://localhost:3300/api
     VITE_URL=http://localhost:3300
     VITE_EMAIL_ADMIN_RECEIVE_ORDER=thongb2111955@student.ctu.edu.vn
     ```

2. **Install Dependencies**  
   - Run the following command to install all required dependencies:  
     ```bash
     npm install
     ```

3. **Run the Development Server**  
   - Start the frontend development server using:  
     ```bash
     npm run dev
     ```

---

### **Notes**
- Ensure the backend server is running before starting the frontend.
- Make sure the `VITE_API_URL` and `VITE_URL` match your backend server URL and port.
- Open your browser at the link provided in the terminal after running `npm run dev` to view the app.
//pm2 resurrect on startup windows