const {mongoURL} = require("../config");
const mongoose = require("mongoose");

mongoose.connect(mongoURL)

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 5,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    firstName: {
        type: String,
        required:true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type:String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    fullName: {
        type: Number,
        required: true
    },
    ledger: [{
            amount: {
                type:Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            toUserId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            fromUserId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            toUserFullName: {
                type: String
            },
            fromUserFullName: {
                type: String
            }
        }]
})


const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    Account,
};

