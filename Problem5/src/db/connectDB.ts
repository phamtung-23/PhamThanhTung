import Logger from '@utils/logger';
import mongoose from 'mongoose';

export const connect = async (port: number | string) =>{
  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(`mongodb://${process.env.MONGODB_HOST || 'localhost'}:${process.env.MONGODB_PORT || 27017}/${process.env.MONGODB_DATABASE}`)
    Logger.log(`Server running on http://localhost:${port}`)
  } catch (error) {
    Logger.log("connect failure!")
  }
}