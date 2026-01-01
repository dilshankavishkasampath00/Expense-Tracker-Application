# Environment Variables for Expense Tracker Application

## For Local Development (.env file in backend/)

```
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=expense_tracker
DB_PORT=3306

# Frontend URL
FRONTEND_URL=http://localhost:3000

# JWT Secret
JWT_SECRET=dev_secret_key_change_in_production

# API URL
API_URL=http://localhost:5000/api
```

---

## For Production (Render.com)

Use these environment variables when deploying:

### 1. **NODE_ENV**
```
KEY: NODE_ENV
VALUE: production
```

### 2. **PORT**
```
KEY: PORT
VALUE: 5000
```

### 3. **DB_HOST** (From PlanetScale)
```
KEY: DB_HOST
VALUE: [Your PlanetScale Host]
Example: ab12cd34.mysql.database.azure.com
```

### 4. **DB_USER**
```
KEY: DB_USER
VALUE: root
```

### 5. **DB_PASSWORD** (From PlanetScale)
```
KEY: DB_PASSWORD
VALUE: [Your PlanetScale Password]
Example: pscale_pw_abc123xyz456
```

### 6. **DB_NAME**
```
KEY: DB_NAME
VALUE: expense_tracker
```

### 7. **JWT_SECRET** (Generate Random)
```
KEY: JWT_SECRET
VALUE: [Random string - use command below]
Example: sk_live_abc123xyz456def789ghi
```

### 8. **FRONTEND_URL** (Your Render app URL)
```
KEY: FRONTEND_URL
VALUE: https://your-app-name.onrender.com
```

### 9. **API_URL** (Same as above)
```
KEY: API_URL
VALUE: https://your-app-name.onrender.com/api
```

---

## How to Generate JWT_SECRET

### Option 1: Use Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Option 2: Use Online Generator
Go to: https://www.uuidgenerator.net/ and copy the value

### Option 3: Simple Random String
```
Use something like: MyApp_Secret_2024_abc123xyz456def789
```

---

## Complete Copy-Paste Values

**Use these as template (replace brackets with actual values):**

| Key | Value |
|-----|-------|
| NODE_ENV | production |
| PORT | 5000 |
| DB_HOST | [PlanetScale host] |
| DB_USER | root |
| DB_PASSWORD | [PlanetScale password] |
| DB_NAME | expense_tracker |
| JWT_SECRET | [Random generated string] |
| FRONTEND_URL | https://your-app-name.onrender.com |
| API_URL | https://your-app-name.onrender.com/api |

---

## Step-by-Step: Add to Render

1. Log in to Render.com
2. Click your Web Service
3. Click **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Enter KEY (e.g., NODE_ENV)
6. Enter VALUE (e.g., production)
7. Click **"Save"**
8. Repeat for all 9 variables
9. Go to **"Deploys"** → **"Redeploy Latest Commit"**

---

## Where to Get Values

### PlanetScale Credentials:
1. Go to https://planetscale.com
2. Click your database
3. Click **"Connect"**
4. Select **"Node.js"**
5. Copy connection string - extract:
   - HOST
   - USER
   - PASSWORD

### Render URL:
- Found in your Render dashboard
- Format: `https://your-service-name.onrender.com`

---

## Security Notes ⚠️

- ❌ NEVER share JWT_SECRET
- ❌ NEVER commit .env to GitHub
- ❌ NEVER use weak passwords
- ✅ Use strong random strings for JWT_SECRET
- ✅ Keep passwords secure in PlanetScale vault

