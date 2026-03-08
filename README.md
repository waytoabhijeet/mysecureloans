# MySecureLoans – Complete Loan Management Website

A fully functional Node.js/Express-based loan management system with database integration, payment processing, email notifications, and admin dashboard.

---

## 🎯 Features Implemented

### ✅ 1. **Database Integration (MongoDB)**
- All loan applications stored in MongoDB
- Persistent data across server restarts
- Auto-generated unique Application IDs

### ✅ 2. **Email Notifications**
- Confirmation email sent when application is submitted
- Approval notification when loan is approved
- Requires Gmail setup with app-specific passwords

### ✅ 3. **Admin Dashboard**
- Secure login with password protection
- View all loan applications
- Update loan status (Applied → Under Review → Approved/Rejected → Completed)
- Real-time statistics dashboard
- Admin can trigger approval emails

### ✅ 4. **Loan Status Tracker**
- Applicants can track their loan status using Application ID
- Displays current application status
- Shows application and approval dates
- Public-facing status page

### ✅ 5. **Payment Gateway (Razorpay)**
- Integrate Razorpay for loan payments
- Payment verification and storage
- After successful payment, application moves to "Under Review"
- Secure Razorpay integration with order creation

### ✅ 6. **Custom Content**
- Updated phone numbers (+91-9999-999-999)
- Business email (support@mysecureloans.com)
- Office location and hours
- WhatsApp integration for direct messaging

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB running locally or MongoDB Atlas connection string
- Gmail account (for email notifications)
- Razorpay test keys (for payment integration)

### Installation

1. **Clone/Navigate to project:**
   ```bash
   cd mysecureloans
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables** – Create/update `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mysecureloans
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx
   ADMIN_PASSWORD=securepassword123
   ```

   **For Gmail:**
   - Enable 2-factor authentication
   - Generate app-specific password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Use that password in `EMAIL_PASS`

   **For Razorpay:**
   - Sign up at [razorpay.com](https://razorpay.com)
   - Get test keys from Dashboard → Settings → API Keys
   - Use test keys for development

4. **Ensure MongoDB is running:**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (update MONGODB_URI in .env)
   ```

5. **Start the server:**
   ```bash
   npm start
   ```

6. **Open your browser:**
   ```
   http://localhost:3000
   ```

---

## 📋 User Features

### For Applicants
1. **Apply for Loan** – Fill form with personal & loan details
2. **Receive Confirmation** – Email sent with Application ID
3. **Make Payment** – Use Razorpay to pay (test card: 4111-1111-1111-1111)
4. **Track Status** – Enter Application ID to check status
5. **EMI Calculator** – Calculate monthly payments

### For Admins
1. **Login** – `/admin/login` (default password: `securepassword123`)
2. **Dashboard** – View all applications and stats
3. **Update Status** – Change loan status for each application
4. **Send Emails** – Approval emails auto-sent on approval
5. **Logout** – Clear admin session

---

## 🛠 Project Structure

```
mysecureloans/
├── app.js                          # Express server & MongoDB setup
├── package.json                    # Dependencies
├── .env                            # Environment variables
├── routes/
│   ├── loans.js                    # Loan application, tracking, payment
│   └── admin.js                    # Admin dashboard & management
├── models/
│   └── Loan.js                     # MongoDB Loan schema
├── utils/
│   └── emailService.js             # Email sending service
├── views/
│   ├── loans/
│   │   ├── index.ejs               # All applications list
│   │   ├── new.ejs                 # New application form
│   │   ├── confirmation.ejs        # Application confirmation + payment
│   │   ├── track.ejs               # Loan status tracker
│   │   ├── show.ejs                # Single loan details
│   │   ├── payment.ejs             # Payment page
│   │   └── not-found.ejs           # 404 page
│   └── admin/
│       ├── login.ejs               # Admin login page
│       └── dashboard.ejs           # Admin dashboard
├── public/
│   ├── index.html                  # Landing page
│   └── styles.css                  # Styling
└── README.md                       # Documentation
```

---

## 🔑 Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Landing page |
| GET | `/loans` | View all applications (public) |
| POST | `/loans` | Submit new application |
| GET | `/loans/track/:applicationId` | Track application status |
| POST | `/loans/verify-payment` | Verify Razorpay payment |
| GET | `/admin/login` | Admin login page |
| POST | `/admin/login` | Admin login |
| GET | `/admin/dashboard` | Admin dashboard (protected) |
| POST | `/admin/update-status/:id` | Update loan status |
| GET | `/admin/logout` | Admin logout |

---

## 🧪 Testing

### Test Razorpay Payment
Use this test card in payment flow:
- **Card:** 4111 1111 1111 1111
- **Expiry:** Any future date
- **CVV:** Any 3 digits

### Test Admin Dashboard
1. Go to `http://localhost:3000/admin/login`
2. Enter password: `securepassword123`
3. You'll see all submitted applications
4. Change status and see email get sent

### Test Email Notifications
1. Fill the loan form with your email
2. Check your inbox for confirmation email
3. In admin dashboard, mark as "Approved"
4. Check inbox for approval email

---

## 📦 Deployment

### Deploy to Render/Heroku

1. **Push code to GitHub**
2. **Create account on** [render.com](https://render.com) or [heroku.com](https://heroku.com)
3. **Connect your repository**
4. **Set environment variables** in dashboard:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   RAZORPAY_KEY_ID=your_key
   RAZORPAY_KEY_SECRET=your_secret
   ADMIN_PASSWORD=your_password
   ```
5. **Deploy** – Server will go live at your app URL
6. **Point GoDaddy domain** – Update DNS records:
   - Set **CNAME** to your deployment URL, or
   - Set **A record** to your server's IP

---

## 🔐 Security Notes

- **Change default admin password** before production
- **Use environment variables** for all secrets (never commit `.env`)
- **Enable HTTPS** on production (auto-done by Render/Heroku)
- **Database backups** – Set up MongoDB Atlas automatic backups
- **Email credentials** – Use app-specific passwords, never your main Gmail password

---

## 🚀 Future Enhancements

- SMS notifications using Twilio
- PDF loan agreement generation
- Document upload for KYC
- Advanced loan scheduling & EMI tracking
- User login & personal dashboard
- Multi-language support
- Mobile app using React Native

---

## 💬 Support

For issues or customization, update:
- Contact information in `/public/index.html`
- Admin password in `.env`
- Razorpay test/live keys when going production
- Email templates in `/utils/emailService.js`

---

## 📝 License

This is a custom web application for loan management.

---

**Ready to deploy? Start with Render or Heroku – it's free for testing!** 🚀