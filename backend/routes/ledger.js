const {Router} = require('express');
const { Account } = require('../db/db.js');
const {userMiddleware} = require('../middleware/user');

const ledgerRouter = Router();

ledgerRouter.get("/history",userMiddleware,async(req,res)=>{
    const account = await Account.findOne({userId: req.userId});
    return res.json({
        history: account.ledger
    }) 
})

module.exports = ledgerRouter;