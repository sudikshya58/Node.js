import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../Schema/UserSchema.js";

const AuthenticateUser=async(req,res,next)=>{
    const Token = req.headers.authorization;
    const token = Token && Token.split(' ')[1];
    console.log(Token)
// try{
    console.log(process.env.JWT_SECRET);
    const verifiying  = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifiying)
    if(!verifiying){
        return res.status(400).json({msg:"unAuthorized"})
    }
    req.user= verifiying // req.user = {
                //  _id:fdjashfkajsdhkjaf, role:client
    // }?

    if(req.user.role === 'user'){
        const findUser = await User.findOne({_id:req.user?._id})
        if(findUser){
            return next(null, req.user);
        }else{
            return res.status(401).json({msg:"unAuthorized"})
        }
    }else if(req.user?.role === 'Admin'){
        //place the condition
            return next(null,req.user)
    }else{
        return res.status(401).json({msg:"unAuthorized"})
    }
// }
// catch(error){
//     return res.status(500).json({msg:"internal sever error"})
// }
}

export default AuthenticateUser;