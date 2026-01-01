BACKEND CONFIGURATION GUIDE
===========================

## 📋 Prerequisites
- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm (comes with Node.js)

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Database
```bash
# Import the schema into MySQL Workbench or MySQL CLI
mysql -u root -p < ../database/schema.sql
```

### 3. Environment Variables
The `.env` file is already configured with defaults:
- DB_HOST: localhost
- DB_USER: root
- DB_PASSWORD: password (change this!)
- DB_NAME: expense_tracker
- JWT_SECRET: expense_tracker_secret_key_2024

**To customize, edit the `.env` file:**
```env
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database_name
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires token)
- `POST /api/auth/logout` - Logout

### Expenses (All require authentication)
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Add new expense
- `GET /api/expenses/:id` - Get expense by ID
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Reports (All require authentication)
- `GET /api/reports/monthly` - Monthly summary
- `GET /api/reports/category` - Category-wise breakdown
- `GET /api/reports/income-vs-expense` - Income vs Expense
- `GET /api/reports/monthly-breakdown` - Last 12 months breakdown

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Login Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Using the Token:
Add the token to the Authorization header for protected routes:
```
Authorization: Bearer <your_token_here>
```

## 📝 Example Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Add Expense
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "category": "Food",
    "amount": 25.50,
    "description": "Lunch",
    "date": "2024-01-01"
  }'
```

## ⚠️ Important Notes

1. **Change the JWT_SECRET** in production to a secure random string
2. **Change the database password** from default
3. **Enable HTTPS** in production
4. **Rate limiting** should be implemented for production
5. **Input validation** is basic; add stricter validation for production
6. **CORS** is configured to accept requests from http://localhost:3000

## 🐛 Troubleshooting

### Database Connection Error
- Check if MySQL is running
- Verify database credentials in `.env`
- Ensure the database exists (run schema.sql)

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using port 5000

### Token Errors
- Ensure token is in Authorization header
- Check if token has expired (24 hours)
- Verify JWT_SECRET matches between login and protected routes

## 📚 Additional Resources
- Express.js: https://expressjs.com
- MySQL2: https://github.com/sidorares/node-mysql2
- JWT: https://jwt.io
