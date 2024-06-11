const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const jwtSecret = "dbubaocoabfciqbcffcbp";

router.post('/createuser',
       // username must be an email
       body('email','email should be correct.').isEmail(),
       body('name').isLength({ min: 3 }),
       // password must be at least 5 chars long
       body('password','Password must be more than 3 char.').isLength({ min: 5 }), 
    async (req, res) => {
         // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            location: req.body.location
        });
        res.json({ success: true, user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }

})
router.post("/loginuser",
    [body('email','email should be correct.').isEmail(),
    body('password','Password must be more than 3 char.').isLength({ min: 5 }) ],

    async(req,res)=>{
    let email=req.body.email;
          // Finds the validation errors in this request and wraps them in an object with handy functions
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
    try {
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({error:"Invalid credentials."})
        }
        const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
        if(!pwdCompare){
            return res.status(400).json({error:"Invalid credentials."})
  
        }
        const data ={
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret)
          res.json({ success: true,authToken:authToken});
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})
module.exports= router;

