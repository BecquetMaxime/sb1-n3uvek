import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const adminUser = await User.findOne({ email: 'admin@spas-galame.fr' });
    
    if (!adminUser) {
      const newAdmin = new User({
        email: 'admin@spas-galame.fr',
        password: 'adminadmin',
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User'
      });
      
      await newAdmin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

createAdminUser();