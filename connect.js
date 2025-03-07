import mongoose from "mongoose";

async function connectToMongoDb(url){
    return mongoose.connect(url).then(()=>{console.log("Db connected")})
}

export default connectToMongoDb