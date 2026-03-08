# MySecureLoans - Render.com Deployment Guide

## ✅ Deployment Ready!

Your application is now prepared for free deployment on Render.com

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Sign in or create account
3. Click "New Repository"
4. Repository name: `mysecureloans`
5. Make it **Public** (required for free Render deployment)
6. Click "Create repository"

### Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
cd /Users/abhijeetchitransh/Documents/mysecureloans

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/mysecureloans.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Deploy on Render

1. Go to [render.com](https://render.com)
2. Click "Sign up" (or sign in if you have account)
3. Sign up with GitHub for easier deployment
4. Click "New +" button → "Web Service"
5. Select your `mysecureloans` repository
6. Fill in details:
   - **Name:** mysecureloans
   - **Environment:** Node
   - **Region:** (leave default)
   - **Start Command:** `npm start`
   - **Plan:** Free

### Step 4: Add Environment Variables

Before deploying, add these environment variables in Render:

1. In Render dashboard, go to your service
2. Click "Environment" tab
3. Add these variables:

```
MONGODB_URI=mongodb+srv://waytoabhijeet_db_user:MH54rF2UFDmENZbr@cluster0.makbghd.mongodb.net/?appName=Cluster0

EMAIL_USER=waytoabhijeet@gmail.com

EMAIL_PASS=ywsg mdsi xdgv vdua

ADMIN_PASSWORD=securepassword123

PORT=3000
```

4. Click "Deploy" button

### Step 5: Wait for Deployment

- Render will automatically build and deploy your app
- You'll see deployment logs in real-time
- Once complete, you'll get a live URL like: `https://mysecureloans-xxxx.onrender.com`

### ⚠️ Important Notes

**Free Tier Limitations:**
- Auto-sleeps after 15 minutes of inactivity
- Cold start takes ~30 seconds on first request
- Ideal for development and low-traffic sites

**To Keep App Always Running:**
- Upgrade to paid plan ($7/month)
- OR use alternative: Oracle Cloud (always free)

### ✅ What's Included

- Free Node.js hosting
- Free MongoDB Atlas (512MB)
- Free email with Gmail
- **Total Cost: $0/month**

### 📝 Next Steps After Deployment

1. Test your live URL
2. Submit a loan application
3. Check email for confirmation
4. Access admin dashboard
5. Monitor logs in Render dashboard

### 🆘 Troubleshooting

**If app won't start:**
- Check Render deployment logs
- Ensure all environment variables are set
- Verify PORT is set to 3000

**If MongoDB connection fails:**
- Check MONGODB_URI is correct
- Ensure IP whitelist includes Render's IPs (allow 0.0.0.0/0)

**If emails not sending:**
- Verify EMAIL_USER and EMAIL_PASS
- Check Gmail security settings

---

**Good luck! Your app will be live soon! 🚀**
