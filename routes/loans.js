const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const { sendApplicationEmail } = require('../utils/emailService');

// list all loans (public)
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find();
    res.render('loans/index', { loans });
  } catch (error) {
    res.status(500).send('Error fetching loans');
  }
});

// form to create a new loan
router.get('/new', (req, res) => {
  res.render('loans/new');
});

// create loan
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, 'loan-type': loanType, amount, income } = req.body;
    const applicationId = 'APP' + Date.now() + Math.random().toString(36).substr(2, 9);
    
    const loan = new Loan({ 
      name, 
      phone, 
      email,
      loanType,
      amount, 
      income,
      applicationId
    });
    
    await loan.save();
    await sendApplicationEmail(loan);
    
    res.render('loans/confirmation', { 
      name, 
      loanType, 
      amount, 
      applicationId: loan.applicationId
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error submitting application');
  }
});

// track loan status
router.get('/track/:applicationId', async (req, res) => {
  try {
    const loan = await Loan.findOne({ applicationId: req.params.applicationId });
    if (!loan) return res.status(404).render('loans/not-found');
    res.render('loans/track', { loan });
  } catch (error) {
    res.status(500).send('Error fetching loan details');
  }
});

// show loan details
router.get('/:id', async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).send('Loan not found');
    res.render('loans/show', { loan });
  } catch (error) {
    res.status(500).send('Error fetching loan');
  }
});

module.exports = router;