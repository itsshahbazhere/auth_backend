const User = require('../models/authModel');

const bcrypt = require('bcrypt');

exports.login = async(req,res)=>{
    try{
        const { name, email, password, role} = req.body;
        
    }
    catch(err){
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