import mongoose from 'mongoose';
const MONGOURL="mongodb://localhost:27017/project";
const connecttDb=()=>{
    try{
       const connected= mongoose.connect(MONGOURL);
       if(connected){

           console.log("connected to database successfully");
       }
    }
    catch(err){
        console.log("failed to connect to db",err)
    }
}
export default connecttDb;