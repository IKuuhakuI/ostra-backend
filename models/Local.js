// models/Local.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const LocalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: {
    type: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    required: true,
  },
  feedbacks: [FeedbackSchema],
  averageRating: { type: Number, default: 0 },
});

LocalSchema.methods.calculateAverageRating = function () {
  if (this.feedbacks.length === 0) {
    this.averageRating = 0;
  } else {
    const sum = this.feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
    this.averageRating = sum / this.feedbacks.length;
  }
  return this.averageRating;
};

module.exports = mongoose.model('Local', LocalSchema);
