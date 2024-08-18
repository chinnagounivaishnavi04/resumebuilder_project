const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalDetails: {
    name: String,
    email: String,
    phone: String,
  },
  education: [{
    institution: String,
    degree: String,
    startYear: String,
    endYear: String,
  }],
  experience: [{
    company: String,
    role: String,
    startYear: String,
    endYear: String,
    description: String,
  }],
  skills: [String],
});

module.exports = mongoose.model('Resume', ResumeSchema);