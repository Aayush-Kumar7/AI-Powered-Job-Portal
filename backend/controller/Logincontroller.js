const UserModel = require("../models/User") ;
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;

const Login = async (req, res) => {
    try{
    const { email, password } = req.body;
    console.log("Incoming Login Data:", req.body);

    if (!email || !password) {
         console.log("❌ Missing email or password");
      return res.status(400).json({ msg: "Email and password required" });
    }
    const user = await UserModel.findOne({email});

    if (!user) {
         console.log("❌ User not found for email:", email);
     
        return res.status(400).json({ msg: 'User not Signup' });
    }
       console.log("user email",user.email);
 console.log("User Password (Hashed):",password, user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Password is Wrong' });
    }

    const token = jwt.sign({ id: user._id, role:user.role }, process.env.JWT_SECRET, {
        expiresIn: '10h'
    });

    res.json({ token,user });
}catch(err){
    res.status(500).json({error:err.message});
}

};

module.exports = {Login};
