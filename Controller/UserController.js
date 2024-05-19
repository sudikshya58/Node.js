import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Schema/UserSchema.js";
dotenv.config();

export const register = async (req, res) => {
  const { email, password,confirmpassword } = req.body;
  const salt = 10;
  try {
    if (!email) {
      return res.status(400).json({ msg: "Please enter an email" });
    }
    if (!password) {
      return res.status(400).json({ msg: "Please enter a password" });
    }
    if (password.length <= 6) {
      return res.status(400).json({ msg: "Password length must be more than 6 characters" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ msg: "Password and confirm password must be the same" });
    }
    const hashPassword = await bcrypt.hash(password, salt);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const registerUser = await User.create({
      ...req.body,
      password: hashPassword,
      confirmpassword:hashPassword,
    });
    if (registerUser) {
      return res.status(200).json({ msg: "User registered successfully" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const UserData = await User.findOne({ email });

    if (!UserData) {
      return res.status(500).json({ msg: "Please enter valid credentials" });
    }

    const validPassword = await bcrypt.compare(password, UserData.password);

    if (!validPassword) {
      return res.status(500).json({ msg: "Enter valid password" });
    }

    const jwtPayload = {
      _id: UserData._id,
      role: "user",
    };

    // Create and return the token
    const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .json({ msg: "Successful login", UserData,accessToken: `Bearer ${accessToken}` });
  } catch (err) {
    return res.status(500).json({ msg: "Login error" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    if (users) {
      return res.status(200).json({ data: users });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};
export const getUserDetails=async(req,res)=>{
// try{
  const userDetail=await User.findOne({_id:req.user._id}).select("email username");
  if(userDetail){
    return res.status(200).json({data:userDetail});
  }
  else{
    return res.status(500).json({msg:"Data not found"});
  }
// }
// catch(err){
//   return res.status(500).json({msg:"Internal server error"})
// }
}
export const updateUser = async (req, res) => {
  // try {
    const filterQuery = {
      _id: req.user._id
    }

   if(req.user.role === 'admin'){
    if(!req.body.id){
      return res.status(400).json({msg:"please provide the user id !!!  "})
    }
      filterQuery._id = req.body.id
   }

    if (req.body.password) {
      return res.status(400).json({ msg: "password cannot be changed" });
    }
    const userData = await User.findOne(filterQuery);
    if (userData) {
      const updatedData = await User.findOneAndUpdate(
        filterQuery,
        {
          $set: {
            ...req.body,
          },
        },
        {
          new: true,
        }
      );
      if (updatedData) {
        return res.status(200).json({
          msg: "Data updated Successfully",
          data: updatedData,
        });
      }
    } else {
      return res.status(400).json({ msg: "User not found" });
    }
  // } catch (err) {
  //   return res.status(500).json({ msg: "INternam server error" });
  // }
};

export const deleteUser = async (req, res) => {
    try {
        const filterQuery = {
            _id: req.user._id
        };

        if (req.user.role === 'admin') {
            if (!req.body.id) {
                return res.status(400).json({ msg: "please provide the user id !!!  " });
            }
            filterQuery._id = req.body.id;
        }

        const userDelete = await User.findOneAndDelete(filterQuery);

        if (userDelete) {
            return res.status(200).json({ msg: "User deleted successfully", data: userDelete });
        } else {
            return res.status(400).json({ msg: "No user found" });
        }
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
    }
};

