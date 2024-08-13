import mongoose from "mongoose";

export const ConnectDB = () =>{
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log(`Database connected successfully to ${process.env.MONGO_URL}`)
    } catch(err){
        console.log(`error in connecting DB ${err}`)
    }
};
