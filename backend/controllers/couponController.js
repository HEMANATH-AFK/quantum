import asyncHandler from 'express-async-handler';
import Coupon from '../models/couponModel.js';

// @desc    Create a coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
  const { code, discount } = req.body;

  const couponExists = await Coupon.findOne({ code: code.toUpperCase() });

  if (couponExists) {
    res.status(400);
    throw new Error('Coupon already exists');
  }

  const coupon = await Coupon.create({
    code: code.toUpperCase(),
    discount,
  });

  if (coupon) {
    res.status(201).json(coupon);
  } else {
    res.status(400);
    throw new Error('Invalid coupon data');
  }
});

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({});
  res.json(coupons);
});

// @desc    Verify a coupon
// @route   POST /api/coupons/verify
// @access  Private
const verifyCoupon = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

  if (coupon) {
    res.json({
      _id: coupon._id,
      code: coupon.code,
      discount: coupon.discount,
    });
  } else {
    res.status(404);
    throw new Error('Invalid or expired coupon code');
  }
});

// @desc    Update a coupon
// @route   PUT /api/coupons/:id
// @access  Private/Admin
const updateCoupon = asyncHandler(async (req, res) => {
  const { code, discount, isActive } = req.body;

  const coupon = await Coupon.findById(req.params.id);

  if (coupon) {
    coupon.code = code.toUpperCase() || coupon.code;
    coupon.discount = discount || coupon.discount;
    if (isActive !== undefined) {
      coupon.isActive = isActive;
    }

    const updatedCoupon = await coupon.save();
    res.json(updatedCoupon);
  } else {
    res.status(404);
    throw new Error('Coupon not found');
  }
});

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (coupon) {
    await Coupon.deleteOne({ _id: coupon._id });
    res.json({ message: 'Coupon removed' });
  } else {
    res.status(404);
    throw new Error('Coupon not found');
  }
});

export {
  createCoupon,
  getCoupons,
  verifyCoupon,
  updateCoupon,
  deleteCoupon,
};
