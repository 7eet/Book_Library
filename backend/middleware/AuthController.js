const User = require("../models/User");
const { createSecretToken } = require("./SecretToken");
const crypto = require("crypto");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" , success: false});
    }
    const user = await User.create({ email, password, username, createdAt })
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user })
  } catch (error) {
    console.log(error);
    res.json({message: "Please fill the required fields", status: false})
  }
};


module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required', success: false})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email', success: false}) 
    }

    const givenPassword = await crypto.createHash("sha256")
    .update(password)
    .digest("hex");

    const dbPassword = user.password;

    const auth = (givenPassword === dbPassword);
    if (!auth) {
      return res.json({message:'Incorrect password or email', success: false }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {httpOnly: false});
     console.log(token)
     res.status(201).json({ message: "User logged in successfully", success: true, user: user});
  } catch (error) {
    console.error(error);
    res.json({message: "Please fill the required fields", status: false})
  }
}

