const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {User,Account} = require('../db')
const {JWT_SECRET} = require('../config')
const authMiddleware = require('../middlewares/middleware')

const Schema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  LastName: zod.string(),
});

const Schema1 = zod.object({
    password: zod.string(),
    firstName: zod.string(),
    LastName: zod.string(),
  });

const SearchSchema = zod.string().optional();


router.post("/SignUp", async (req, res) => {
  const validate = Schema.safeParse(req.body);
  if (!validate.success) {
    return res.status(400).json({ error: validate.error });
  }
  
  const CheckExist = await User.findOne({ username: req.body.username });
  if (CheckExist) {
    return res.status(400).json({ error: "User Already Exists" });
  }
  
  console.log("new user entering");
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      LastName: req.body.LastName,
    });
    await newUser.save();
    
    await Account.create({
      userId: newUser._id,
      balance: 1+Math.random()*1000,
    });
    
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
    return res.status(201).json({ 
      message: "User and account created successfully", 
      token 
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
});


router.put('/update', authMiddleware, async (req, res) => {
   const validate = Schema1.safeParse(req.body);
   if(!validate.success){
    return res.status(400).json({ error: validate.error });
   }
   
   try {
     const user =await User.findOneAndUpdate({ _id: req.userId }, req.body, {
      returnOriginal: false
    });
    await user.save();
     return res.json({message: "Updated Successfully"});
   } catch (error) {
     console.error("Error updating user:", error);
     return res.status(500).json({ error: "Failed to update user" });
   }
});

router.get('/bulk', async(req, res) => {
    const toFindUser = req.query.toFindUser || "";
    
    try {
      const users = await User.find({
        $or:[{
           firstName:{
            "$regex":toFindUser,
            "$options": "i"
           }
        },{
            LastName:{
                "$regex":toFindUser,
                "$options": "i"
            }
        }]
      });
      
      return res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            LastName: user.LastName,
            _id: user._id
        }))
      });
    } catch (error) {
      console.error("Error finding users:", error);
      return res.status(500).json({ error: "Failed to find users" });
    }
});

module.exports = router;
