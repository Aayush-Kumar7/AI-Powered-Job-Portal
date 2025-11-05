const mongoose = require("mongoose");

const userSchema  = new mongoose.Schema({
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
        enum:['user','admin','recruiter'],
    },
    skills:{
        type:[String],
        required:function(){
            return this.role === 'user';
        },
        default: undefined
    },
    resume:{
        type:[String],
        required:function(){
            return this.role === 'user';
        },
        default: undefined
    },
    profilepic:{
        type:String,
    }
    
});
userSchema.pre("save", function (next) {
  if (this.role !== "user") {
    this.skills = undefined;
    this.resume = undefined;
  }
  next();
});

const UserModel = mongoose.model('User',userSchema);
module.exports = UserModel;