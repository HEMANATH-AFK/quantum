import express from 'express';
const router = express.Router();
import {
  createCoupon,
  getCoupons,
  verifyCoupon,
  updateCoupon,
  deleteCoupon,
} from '../controllers/couponController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, admin, createCoupon).get(protect, admin, getCoupons);
router.route('/verify').post(protect, verifyCoupon);
router
  .route('/:id')
  .put(protect, admin, updateCoupon)
  .delete(protect, admin, deleteCoupon);

export default router;
