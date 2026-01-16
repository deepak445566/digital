const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [{
    type: String,
  }],
  responsibilities: [{
    type: String,
  }],
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD',
    },
  },
  experience: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  applicationDeadline: {
    type: Date,
  },
});

module.exports = mongoose.model('Job', jobSchema);