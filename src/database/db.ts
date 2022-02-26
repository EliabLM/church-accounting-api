import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await connect(process.env.DB_MONGO || '');

    console.log('DB conectada');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
