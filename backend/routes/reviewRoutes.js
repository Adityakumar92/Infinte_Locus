const { submitReview, getApprovedReviewsByBusiness, approveReview, rejectReview } = require('../controllers/reviewController');
const { auth, adminOnly } = require('../middleware/auth');

const router = require('express').Router();

router.post('/:businessId', auth, submitReview);
router.get('/:businessId', getApprovedReviewsByBusiness);
router.patch('/:reviewId/approve', auth, adminOnly, approveReview);
router.patch('/:reviewId/reject', auth, adminOnly, rejectReview);

module.exports=router;