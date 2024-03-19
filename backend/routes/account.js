const express = require("express");
const router = express.Router();
const {Account, User} = require("../db/db");

const {userMiddleware} = require("../middleware/user");
const { default: mongoose } = require("mongoose");

router.get("/balance", userMiddleware, async (req,res)=>{
    try {
        const account = await Account.findOne({
            userId: req.userId
        });

        res.json({
            balance: account.balance
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Internal Server Error in Balance checking"
        });
    }
})



// hardest bit to transfer money:
// create a session first in mongodb and  then update the two accounts with the new information
// if  there is an error during this process we need to rollback to keep data consistent


router.post("/transfer", userMiddleware, async (req,res)=>{

try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const {amount, to} = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session); // get the sender's account

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg:"Not sufficient fund"
        });
    }

    const toAcc = await Account.findOne({
        userId: to
    }).session(session);

    if(!toAcc){
        await session.abortTransaction();
        return res.status(400).json({
            msg: " Account doesn't exist "
        });
    }

    //---------------------------------
    await Account.updateOne({
        userId: req.userId
    },{
        $inc:{
            balance: -amount
        }
    }).session(session);

    await Account.updateOne({
        userId: to
    },{
        $inc:{
            balance: amount
        }
    }).session(session);


    //--------------------------------------- ledger -----------------------------
    const sender = await User.findOne({_id: req.userId}).session(session);
    const senderName = sender.firstName + " " + sender.lastName;
    const receiver = await User.findOne({_id: to }).session(session);
    const receiverName = receiver.firstName + " " + receiver.lastName;

    await Account.updateOne({
        userId: req.userId
    },{
        $push: {
            ledger:{
                amount: -amount,
                toUserId: to,
                toUserFullName: receiverName
            }
        }
    }).session(session)


    await Account.updateOne({
        userId: to
    },{
        $push:{
            ledger:{
                amount: amount,
                fromUserId: req.userId,
                fromUserFullName: senderName
            }
        }
    }).session(session)


    // ------------------------------------------------------------------------------------
    await session.commitTransaction();

    return res.json({
        msg: "transaction successfull"
    });

}   catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Internal Server Error in Transaction"
        });
    }

})

module.exports = router;
