// routes/local.js
const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  createLocal,
  getLocals,
  getLocalById,
  addFeedback,
} = require('../controllers/local');

router.post('/', protect, createLocal);
router.get('/', getLocals);
router.get('/:id', getLocalById);
router.post('/:id/feedback', protect, addFeedback);

module.exports = router;
