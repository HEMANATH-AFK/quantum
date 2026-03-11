import mongoose from 'mongoose';
import User from './models/userModel.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const userExists = await User.findOne({ email: 'superadmin@example.com' });
    if (userExists) {
      console.log('\nAdmin already exists: superadmin@example.com / admin123\n');
      process.exit(0);
    }

    const adminUser = await User.create({
      name: 'Super Admin',
      email: 'superadmin@example.com',
      password: 'admin123',
      isAdmin: true
    });

    console.log(`\nAdmin account created successfully!`);
    console.log(`Email: ${adminUser.email}`);
    console.log(`Password: admin123\n`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
