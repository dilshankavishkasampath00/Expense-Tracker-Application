# 📌 Expense Tracker Application

## 1. Project Overview

The Expense Tracker Application helps users:

- **Record daily income & expenses**
- **View monthly spending**
- **Analyze expenses by category** (Food, Travel, Rent, etc.)

It is a **Full-Stack Web Application** using:

- **Frontend:** React.js
- **Backend:** Node.js (Express) or Python Flask
- **Database:** MySQL (via MySQL Workbench)

---

## 🛠 2. Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, HTML, CSS, Bootstrap |
| **Backend** | Node.js (Express) or Python (Flask) |
| **Database** | MySQL |
| **API Type** | REST API |
| **Tools** | VS Code, MySQL Workbench, Postman |

---

## 📁 3. System Modules

### 👤 User Module
- Register
- Login
- Logout

### 💵 Expense Module
- Add expense
- Edit expense
- Delete expense
- View all expenses

### 📊 Reports Module
- Monthly expense summary
- Category-wise report
- Total income vs expense

---

## 📂 Project Structure

```
Expense Tracker Application/
├── frontend/                 # React.js application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   └── App.js
│   └── package.json
├── backend/                  # Node.js/Python backend
│   ├── routes/               # API routes
│   ├── models/               # Database models
│   ├── controllers/          # Business logic
│   └── config/               # Configuration files
├── database/                 # Database schema and scripts
└── README.md                 # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm (for backend)
- Python 3.x (if using Flask)
- MySQL Server & MySQL Workbench
- React.js

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Expense Tracker Application"
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install  # or pip install -r requirements.txt
   npm start    # or python app.py
   ```

4. **Setup Database**
   - Open MySQL Workbench
   - Import the database schema from `database/` folder
   - Update database credentials in backend config

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Expenses
- `POST /api/expenses` - Add new expense
- `GET /api/expenses` - View all expenses
- `PUT /api/expenses/:id` - Edit expense
- `DELETE /api/expenses/:id` - Delete expense

### Reports
- `GET /api/reports/monthly` - Monthly summary
- `GET /api/reports/category` - Category-wise report
- `GET /api/reports/income-vs-expense` - Income vs Expense comparison

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Expenses Table
```sql
CREATE TABLE expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  category VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description VARCHAR(255),
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  type ENUM('income', 'expense') NOT NULL
);
```

---

## 🧪 Testing

Use **Postman** to test API endpoints:
1. Import the collection from `postman/` folder
2. Set up environment variables (API URL, auth tokens)
3. Run requests to verify functionality

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Contributors

- Your Name

---

## 📧 Support

For issues or questions, please create an issue in the repository or contact support.
