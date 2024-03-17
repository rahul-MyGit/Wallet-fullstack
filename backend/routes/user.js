const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {User, Account} = require("../db/db");
const z = require("zod");

const {userMiddleware} = require("../middleware/user");
const { log } = require("console");



const signupBody = z.object({
    username : z.string().email(),
    password: z.string().min(5),
    lastName: z.string(),
    firstName: z.string()
})

const signinBody = z.object({
    username: z.string().email(),
    password: z.string().min(5)
})


const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

// @route   GET api/auth

router.post('/signup', async (req,res)=>{
    const {success, error} = signupBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            msg: " Incorrect Inputs",
            error: error.errors[0].message
        });
        
    }

    try {
        const username = req.body.username;
        const password = req.body.password;

        const isExist = await User.findOne({username});
        if(isExist){
            return res.status(409).json({
                msg: "Email already taken"
            });
        }
    
        const newUser = await User.create({
            username,
            password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });


        // creating a Account:
        await Account.create({
            userId : newUser._id,
            balance: 1 + Math.random() * 10000
        })

        const token = jwt.sign({
            userId : newUser._id
        }, JWT_SECRET);
        
        return res.json({
            msg: "User Signed up successfully",
            token: token
        });
    
    }catch (error) {
            console.log("Error in database");
            return res.status(500).json({
            msg: "Database error"})
    }
})


router.post("/signin", async (req,res)=>{
    const { success } = signinBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            msg: "Incorrect Inputs",
        })
    }

    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({username, password});
        if(user){
            const token = jwt.sign({
                userId : user._id
            }, JWT_SECRET);

            return res.json({
                token: token
            })
        }

        return res.status(411).json({
            msg: "Error while logging in"
        })

    } catch (error) {
        console.log("Database error");
        return res.status(500).json({
            msg: "Database error"
        })
    }
    
})




router.put("/", userMiddleware, async (req,res)=>{
    const { success, error} = updateBody.safeParse(req.body);

    if(!success){
        return res.status(400).json({
            msg: "Error in updating field value",
            error: error.errors[0].message
        });
    }
    try {
        await User.updateOne({ _id: req.userId}, req.body)
        console.log(req.userId);
        console.log(req.body);
        return res.json({
        msg: "Updated successfuly"
    });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });

    }
})



router.get("/bulk", async (req,res)=>{
    const filter = req.query.filter || "";
    try {
        let allUser = await User.find({
            $or:[
                {firstName:{ "$regex":filter}},
                {lastName:{  "$regex": filter}}
            ]
        })
    
        res.json({
            user: allUser.map((user)=>({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
    
})


router.get("/", userMiddleware, async (req,res)=>{

    try {

        const user = await User.findOne({
            _id: req.userId
        })


        res.json({
            email: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            id: req.userId
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });

    }
    
})





module.exports = router;