const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

const Users = require('../models/user');

router.post('/signin', (req,res,next) => {
    const { email, password }  = req.body;
    
    if(!email || !password) return res.json({ success: false, msg: 'Please enter all fields!' });

    Users.find({ email })
        .then(result => {
            if(result.length === 0) return res.json({ success: false, msg: 'User not found!' });
        
                const loginUser = result[0];
                bcrypt.compare(password, loginUser.password)
                    .then(isMatch => {
                        if(!isMatch) return res.json({success: false, msg: 'Invalid Password!'});
                        
                        jwt.sign(
                            {id: loginUser._id},
                            config.secret,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err
                                res.status(200).json({
                                    success: true,
                                    token,
                                    user: {
                                        id: loginUser._id,
                                        email: loginUser.email
                                    }
                                })
                            }
                        )
                    
                    });

        });
    });




module.exports = router;