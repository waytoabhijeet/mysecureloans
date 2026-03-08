const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const { sendApprovalEmail } = require('../utils/emailService');

// admin root - redirect to login
router.get('/', (req, res) => {
  res.redirect('/admin/login');
});

// admin login
router.get('/login', (req, res) => {
  res.render('admin/login');
});

// admin login post
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.cookie('adminAuth', 'authenticated', { httpOnly: true });
    res.redirect('/admin/dashboard');
  } else {
    res.render('admin/login', { error: 'Invalid password' });
  }
});

// admin dashboard (with auth check)
router.get('/dashboard', async (req, res) => {
  if (req.cookies.adminAuth !== 'authenticated') {
    return res.redirect('/admin/login');
  }
  
  try {
    const loans = await Loan.find().sort({ appliedAt: -1 });
    const stats = {
      total: loans.length,
      applied: loans.filter(l => l.status === 'Applied').length,
      approved: loans.filter(l => l.status === 'Approved').length,
      rejected: loans.filter(l => l.status === 'Rejected').length,
      completed: loans.filter(l => l.status === 'Completed').length
    };
    res.render('admin/dashboard', { loans, stats });
  } catch (error) {
    res.status(500).send('Error loading dashboard');
  }
});

// update loan status
router.post('/update-status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const loan = await Loan.findByIdAndUpdate(req.params.id, { 
      status, 
      approvalDate: new Date() 
    }, { new: true });
    
    if (status === 'Approved') {
      await sendApprovalEmail(loan);
    }
    
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(500).send('Error updating status');
  }
});

// logout
router.get('/logout', (req, res) => {
  res.clearCookie('adminAuth');
  res.redirect('/');
});

module.exports = router;