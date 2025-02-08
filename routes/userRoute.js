const express = require('express');
const router = express.Router();

const {login,signup, getAllData} = require('../controllers/authController');

const {auth, isStudent, isAdmin} = require('../middlewares/auth')

router.post('/login',login);
router.post('/signup',signup);

//protected route for text user and admin

router.get('/test', auth, (req,res)=>{
    res.json({
        success:true,
        message: "welcome protected route for test"
    })
})

router.get('/student', auth, isStudent, (req,res)=>{
    res.json({
        success:true,
        message: "welcome protected route for student"
    })
})

router.get('/admin', auth, isAdmin, (req,res)=>{
    res.json({
        success:true,
        message: "welcome protected route for admin"
    })
})

router.get('/getAllData', auth, getAllData);

module.exports = router;