const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  loanType: { type: String, required: true },
  amount: { type: Number, required: true },
  income: { type: Number, required: true },
  status: { type: String, default: 'Applied', enum: ['Applied', 'Under Review', 'Approved', 'Rejected', 'Completed'] },
  appliedAt: { type: Date, default: Date.now },
  approvalDate: { type: Date },
  applicationId: { type: String, unique: true }
});

module.exports = mongoose.model('Loan', loanSchema);