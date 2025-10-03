
import mongoose from "mongoose";

const UserSchema  = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
    type:String,
    required:true
    },
    role:{
        type:String,
        required:true
    },
    verifyCode:{
        type:String,
        unique:true,
    },
    verifyCodeExpiry:{
        type:String,
    },
  isAdmin: {
  type: Boolean,
  default: false
},

    playList: [
        {
            type:String,
            required:true          
        }
    ]},

{
timestamps:true
}
)




export  const User = mongoose.model("User",UserSchema);

