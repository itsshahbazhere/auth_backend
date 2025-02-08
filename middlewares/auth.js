//auth isStudent isAdmin

const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.auth = (req,res,next) =>{
    try{
        //three types of extract token req body , cookies, headers (header is more secure than other , req body is less secure than other)
        //fetch token

        console.log('cookies', req.cookies.token);
        console.log('body', req.body.token);
        console.log('header', req.header("Authorization"));

        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message: "token missing",
            })
        }

        //verify token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;

        } catch (err){
            return res.status(401).json({
                success:false,
                message: "invalid token",
            })
        }

        next();

    } 
    catch(err){
        return res.status(401).json({
            success:false,
            message: "somthing went wrong while verifying the token",
        })
    }
}

exports.isStudent = (req,res,next) =>{

    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message: "this is protected route for student",
            })

        }  
        next();      

    } catch(err){
        return res.status(500).json({
            success:false,
            message: "user role not match",
        })
    }

    next();

}

exports.isAdmin = (req,res,next) =>{

    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message: "this is protected route for admin",
            })

        }  
        next();      

    } catch(err){
        return res.status(500).json({
            success:false,
            message: "user role not match",
        })
    }

    next();

}