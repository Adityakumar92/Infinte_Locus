const { createBusiness, getAllBusinesses, getBusinessById } = require('../controllers/businessController');
const { auth, adminOnly } = require('../middleware/auth');

const router = require('express').Router();

router.post('/', auth, adminOnly, createBusiness);
router.get('/', getAllBusinesses);
router.get('/:id', getBusinessById);

module.exports=router;