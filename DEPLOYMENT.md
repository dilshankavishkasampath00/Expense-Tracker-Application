# Deployment Guide - Run on Internet

## Supported Platforms
- **Railway.app** (Recommended - easiest)
- **Heroku**
- **Render.com**
- **AWS, Azure, Google Cloud**

---

## Quick Deployment on Railway.app (Recommended)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub account
3. Authorize Railway

### Step 2: Connect GitHub Repository
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your expense-tracker repository
4. Click "Deploy Now"

### Step 3: Add MySQL Database
1. In Railway Dashboard, click "Add Services"
2. Select "MySQL"
3. Set root password
4. Link to your project

### Step 4: Add Environment Variables
In Railway Dashboard, go to **Variables** and add:
```
PORT=5000
NODE_ENV=production
DB_HOST=[MySQL host from Railway]
DB_USER=root
DB_PASSWORD=[Your MySQL password]
DB_NAME=expense_tracker
DB_PORT=3306
JWT_SECRET=[Generate random string]
FRONTEND_URL=[Your Railway app URL]
```

### Step 5: Run Database Setup
1. After deployment, connect to the MySQL service
2. Run the SQL from `database/schema.sql`

---

## Local Testing Before Deploy

```bash
# 1. Install dependencies
cd backend
npm install
cd ../frontend
npm install

# 2. Build frontend
npm run build

# 3. Test locally
cd ../backend
PORT=5000 npm start
```

Visit `http://localhost:5000` in browser.

---

## Environment Variables Needed

### For Production
```
DB_HOST=your-mysql-host.railway.internal
DB_USER=root
DB_PASSWORD=strong_password
DB_NAME=expense_tracker
JWT_SECRET=long_random_string_here
NODE_ENV=production
PORT=5000
```

---

## Troubleshooting

### Build fails with "npm: not found"
- Railway automatically detects Node.js from `package.json`
- Ensure `backend/package.json` exists with `"engines": { "node": "18.x" }`

### Frontend not loading
- Check if build is running: `npm run build`
- Verify `frontend/build/` folder exists
- Check CORS settings in backend

### Database connection fails
- Verify MySQL is running in Railway
- Check DB credentials match environment variables
- Run schema.sql to create tables

---

## After Deployment

1. Your app will be live at: `https://your-railway-app-name.up.railway.app`
2. Database is private and hosted on Railway
3. Monitor logs in Railway Dashboard

**Done!** Your Expense Tracker is now on the internet! 🎉
