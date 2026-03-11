import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getRelatedProducts,
  uploadProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/upload').post(protect, admin, upload.single('csvFile'), uploadProducts);
router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts);
router.get('/:id/related', getRelatedProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;