const User = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.login = async(req,res)=>{
    try{
        //data fetch
        const { email, password } = req.body;
        //validation
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message: "Please provide both email and password"
            });
        }

        //finding email
        const user = await User.findOne({email});
        //if user not exist as this email
        if(!user) {
            res.status(404).json({
                success:false,
                message: "User not found"
            })
        }

        //verify password

        const isMatch = await bcrypt.compare(password, user.password);

        //if password is'nt valid
        if(!isMatch){
            res.status(400).json({
                success:false,
                message: "incorrect password"
            })
        }

//if password is correct then create JWT token

        //generate jwt token
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role
        }
        
        const key = process.env.JWT_SECRET;
        let jwtToken = jwt.sign(payload, key, {expiresIn:"1h"})

        //insert jwt token in user body
        user.token = jwtToken
        //hide password from user body not databse
        user.password = undefined

//creating cookie using jwt token

        const options = {
            httpOnly: true, //not access cookie by client side
            expires : new Date( Date.now() + 3*24*60*60*1000) //consider in ms ie 3 days
        }

        res.cookie("token", jwtToken, options).status(200).json({
            sucess:true,
            message: "logged in successfully",
            jwtToken,
            user
        });

        // res.status(200).json({
        //     sucess:true,
        //     message: "logged in successfully",
        //     jwtToken,
        //     user
        // });
        
    } catch(err){
        return res.status(500).json({
            sucess:false,
            message:"failed to login",
            error:err.message
        })
    }
    
}



//signup route handler
exports.signup = async(req,res)=>{
    try{
        const { name, email, password, role} = req.body;
        const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(400).json({
                sucess:false,
                message:"user already exist",
            });
        }

        //secure password
        let hashPassword;
        try{
            hashPassword = await bcrypt.hash(password,10); //10 round hash
        }
        catch(err){
            return res.status(500).json({
                sucess:false,
                message:"password hashing failed",
            });
        }

        //create entry for user
        const user = await User.create({name, email, password:hashPassword, role});
        return res.status(200).json({
            sucess:true,
            message:"user created sucessfully",
            data:user,
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            sucess:false,
            message:"failed to signup",
            error:err.message

        })
    }
}


//get all data of a user using payload id

exports.getAllData = async(req,res) =>{
    try{
        const id = req.user.id;
        const user =await User.findById(id);
        res.status(200).json({
            sucess:true,
            message:"fetch data using payload passing in token successfully",
            user,
        })

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"failed to get data",
            error:err.message
        })
    }
}
