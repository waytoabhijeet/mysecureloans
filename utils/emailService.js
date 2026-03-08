const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendApplicationEmail = async (loan) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: loan.email,
    subject: 'Loan Application Received - MySecureLoans',
    html: `
      <h2>Thank you for applying!</h2>
      <p>Dear ${loan.name},</p>
      <p>Your ${loan.loanType} application for ₹${loan.amount} has been received.</p>
      <p><strong>Application ID:</strong> ${loan.applicationId}</p>
      <p>We will review your application and contact you within 24-48 hours.</p>
      <p>You can track your application status using your Application ID.</p>
      <p>Best regards,<br>MySecureLoans Team</p>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to:', loan.email);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

const sendApprovalEmail = async (loan) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: loan.email,
    subject: 'Loan Approved - MySecureLoans',
    html: `
      <h2>Congratulations! Your Loan is Approved</h2>
      <p>Dear ${loan.name},</p>
      <p>Your ${loan.loanType} loan of ₹${loan.amount} has been approved!</p>
      <p>Proceed to payment to complete the process.</p>
      <p>Application ID: ${loan.applicationId}</p>
      <p>Best regards,<br>MySecureLoans Team</p>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

module.exports = { sendApplicationEmail, sendApprovalEmail };