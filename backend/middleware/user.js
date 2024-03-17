const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");

function userMiddleware(req,res,next){

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({
            msg :"Invalid creadentials !! you are not authorized"
        });
    }

    let token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.json(403).json({
            msg: "Invalid creadentials !! you are not authorized"
        });
        return;
    }
}

module.exports = {
    userMiddleware
}