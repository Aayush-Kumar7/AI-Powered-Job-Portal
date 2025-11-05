const express = require('express');
const router = express.Router();
const {
  applyJob,
  getAllApplications,
  getUserApplications,
  getJobApplications,
  updateStatus,
} = require('../controller/Application');

// Create new application
router.post('/apply', applyJob);

// Get all applications (Admin)
router.get('/all', getAllApplications);

// Get applications by user
router.get('/user/:userId', getUserApplications);

// Get applications by job (Recruiter)
router.get('/job/:jobId', getJobApplications);

// Update status
router.put('/:id/status', updateStatus);

module.exports = router;
