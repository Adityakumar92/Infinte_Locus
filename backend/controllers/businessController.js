const Business = require('../models/Business');

// @desc    Create a new business (Admin only)
const createBusiness = async (req, res) => {
  try {
    const { name, category, location, description} = req.body;

    const newBusiness = new Business({
      name,
      category,
      location,
      description,
    });

    await newBusiness.save();
    res.status(201).json({ message: 'Business created successfully', business: newBusiness });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating business' });
  }
};

// @desc    Get all businesses (with optional filters)
const getAllBusinesses = async (req, res) => {
  try {
    const { category, location } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (location) filter.location = location;

    const businesses = await Business.find(filter);
    res.status(200).json(businesses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch businesses' });
  }
};

// @desc    Get a single business by ID (with average rating)
const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });

    res.status(200).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching business' });
  }
};

// @desc    Update a business (Admin only - optional)
const updateBusiness = async (req, res) => {
  try {
    const updates = req.body;
    const updatedBusiness = await Business.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updatedBusiness) return res.status(404).json({ message: 'Business not found' });

    res.status(200).json({ message: 'Business updated', business: updatedBusiness });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update business' });
  }
};

// @desc    Delete a business (Admin only - optional)
const deleteBusiness = async (req, res) => {
  try {
    const deletedBusiness = await Business.findByIdAndDelete(req.params.id);

    if (!deletedBusiness) return res.status(404).json({ message: 'Business not found' });

    res.status(200).json({ message: 'Business deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete business' });
  }
};

module.exports = {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
};
