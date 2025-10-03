import mongoose from 'mongoose';

const connectDataBase = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log('connection is successful to database');
  } catch (e) {
    console.log('THIS_IS_SERVE_ERROR ', e);
    process.exit(1);
    // 1 status code means failed, 0 means success
  }
};

export default connectDataBase;
