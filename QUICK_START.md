# QUICK START - Deploy to Render.com in 5 Minutes

## Your project is ready! Follow these 3 steps:

### ✅ Step 1: GitHub Repository (2 minutes)
```
1. Go to github.com and sign up (if needed)
2. Create new repository named: mysecureloans
3. Make it PUBLIC
4. Copy your repository URL
```

### ✅ Step 2: Push Code (1 minute)
```bash
cd /Users/abhijeetchitransh/Documents/mysecureloans

git remote add origin https://github.com/YOUR_USERNAME/mysecureloans.git
git branch -M main
git push -u origin main
```
(Replace YOUR_USERNAME with your GitHub username)

### ✅ Step 3: Deploy on Render (2 minutes)
```
1. Go to render.com
2. Sign up with GitHub
3. Click "New Web Service"
4. Select your mysecureloans repository
5. Fill form:
   - Name: mysecureloans
   - Start Command: npm start
   - Plan: Free
6. Add Environment Variables:
   MONGODB_URI = (copy from your .env)
   EMAIL_USER = (copy from your .env)
   EMAIL_PASS = (copy from your .env)
   ADMIN_PASSWORD = (copy from your .env)
   PORT = 3000
7. Click Deploy!
```

## 🎉 Done!
Your app will be live in 2-3 minutes at:
**https://mysecureloans-xxxx.onrender.com**

## Cost: $0/month ✅
