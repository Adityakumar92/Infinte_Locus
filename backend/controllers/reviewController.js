const Review = require('../models/Review');
const Business = require('../models/Business');

// @desc    Submit a review (User)
const submitReview = async (req, res) => {
  try {
    const { quality, service, value, comment } = req.body;
    const photo = req.file ? req.file.filename : null;
    const businessId = req.params.businessId;

    const newReview = new Review({
      user: req.user.id,
      business: businessId,
      rating: { quality, service, value },
      comment,
      photo,
      status: 'pending'
    });

    await newReview.save();
    res.status(201).json({ message: 'Review submitted and pending approval', review: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting review' });
  }
};

// @desc    Get approved reviews for a business (Public)
const getApprovedReviewsByBusiness = async (req, res) => {
  try {
    const businessId = req.params.businessId;

    const reviews = await Review.find({
      business: businessId,
      status: 'approved'
    }).populate('user', 'name');

    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

// @desc    Approve a review (Admin)
const approveReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { status: 'approved' },
      { new: true }
    );

    if (!review) return res.status(404).json({ message: 'Review not found' });

    // Update average rating in Business
    const approvedReviews = await Review.find({
      business: review.business,
      status: 'approved'
    });

    const avg = {
      quality: 0,
      service: 0,
      value: 0,
    };

    approvedReviews.forEach(r => {
      avg.quality += r.rating.quality;
      avg.service += r.rating.service;
      avg.value += r.rating.value;
    });

    const total = approvedReviews.length;
    const overall = (avg.quality + avg.service + avg.value) / (3 * total);

    await Business.findByIdAndUpdate(review.business, {
      averageRating: overall.toFixed(1)
    });

    res.status(200).json({ message: 'Review approved', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error approving review' });
  }
};

// @desc    Reject a review (Admin)
const rejectReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { status: 'rejected' },
      { new: true }
    );

    if (!review) return res.status(404).json({ message: 'Review not found' });

    res.status(200).json({ message: 'Review rejected', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error rejecting review' });
  }
};

module.exports = {
  submitReview,
  getApprovedReviewsByBusiness,
  approveReview,
  rejectReview
};
