import mongoose from 'mongoose'
import { ENV } from './env';

export const connectToDb=async()=>{
    try {
        const conn=await mongoose.connect(ENV.MONGO_URI);
        console.log("mongoDB COnnected!!",conn.connection.host);
       
    } catch (error) {
        console.log("Error connectiong to MongoDb",error);
        process.exit(1)// 1 status code means fail, 0 means success
        
    }
}