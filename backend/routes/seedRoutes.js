import express from 'express';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    
    await Product.deleteMany({});
    await User.deleteMany({});


    const createdProducts = await Product.insertMany(data.products);
    const createdUsers = await User.insertMany(data.users);

    res.send({ createdProducts, createdUsers });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default seedRouter;
