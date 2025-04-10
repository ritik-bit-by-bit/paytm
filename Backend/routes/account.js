const express = require('express');
const cors = require('cors');
const {User,Account} = require('../db')
const authMiddleware = require('../middlewares/middleware');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/balance', authMiddleware, async(req,res)=>{
   try {
     const account = await Account.findOne({userId:req.userId});
     if (!account) {
       return res.status(404).json({error: "Account not found"});
     }
     return res.json({balance:account.balance});
   } catch (error) {
     console.error("Error fetching balance:", error);
     return res.status(500).json({error: "Failed to fetch balance"});
   }
});


router.post('/transfer', authMiddleware, async(req,res)=>{
    let session;
    try {
      session = await mongoose.startSession();
      session.startTransaction();
      const {amount, to}=req.body;
      
      if (!amount || !to) {
        return res.status(400).json({
          message: "Amount and recipient ID are required"
        });
      }
      
      const account = await Account.findOne({userId:req.userId}).session(session);
      if (!account) {
        await session.abortTransaction();
        return res.status(404).json({
          message: "Account not found"
        });
      }
      
      if(account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
          message:"insufficient balance"
        });
      }
      const toAccount = await Account.findOne({userId:to}).session(session);
      if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
          message:"invalid account"
        });
      }
      await Account.updateOne({
        userId:req.userId
      },{
        balance:account.balance-amount
      }).session(session);
      await Account.updateOne({
        userId:to
      },{
        balance:toAccount.balance+amount
      }).session(session);
      await session.commitTransaction();
      return res.json({
        message:"transfer successful"
      });
    } catch (error) {
      console.error("Error during transfer:", error);
      if (session) {
        await session.abortTransaction();
      }
      return res.status(500).json({error: "Transfer failed"});
    } finally {
      if (session) {
        session.endSession();
      }
    }
});

module.exports = router;
