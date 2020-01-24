const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs'); 
const auth = require('../middleware/auth');


//Register
router.post('/register', auth , (req, res, next) => {
    const { firstName, lastName, email, password, displayName, bio } = req.body;

    let newUser = new User({
        firstName,
        lastName,
        email,
        password,
        displayName,
        bio,
        dateCreated: new Date
    });

     User.find({email}, (err, data) => {
         if(err) throw err;
        if(data.length > 0){
            return res.json({success: false, message: 'Email already exist'});
        }else{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save((err, user) => {
                        if (err) throw err;
                        else return res.json({success: true, message: `${user.displayName} successfully created`});
                    });
                });
            });
        }
     });
});


router.get('/getAllUsers', auth , (req, res) => {
    User.find({})
    .exec((err, allUsers) => {
        if (err) throw err;
        else res.status(200).json(allUsers);
    });
});




router.get('/getUserbyId/:id', auth , (req, res) => {
  
    User.findOne({
        _id: req.params.id
    })
    .exec((err, user) => {
        if (err) throw err;
        else res.status(200).json(user);
    });

});


router.patch('/updateUserbyId/:id', auth , (req, res) => {

   
    User.findOneAndUpdate({
        _id: req.params.id
    },
    {
        $set: req.body
    },
    {
        new: true
    },(err, updatedUser) => {
        if (err)  res.json({ success: false, msg: err });
        else res.status(200).json({success: true, msg: 'Updated successfully' , updatedUser});
    });
});

router.delete('/deleteUserById/:id', auth , (req, res) => {
    User.deleteOne({
      _id: req.params.id  
    }, (err) => {
        if (err) throw err
        else res.status(200).json({success: true, msg: 'User Deleted!'});
    })
})



module.exports = router;