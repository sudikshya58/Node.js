import mongoose from "mongoose";
const UserSchema=mongoose.Schema(
    {
username:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true,
},
confirmpassword:{
    type:String,
    required:true
},

    },
    {
        timeStamps:true
    }
);
    const User=mongoose.model("user",UserSchema);
    export default User;