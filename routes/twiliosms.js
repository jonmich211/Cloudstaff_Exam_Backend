const client = require('twilio')('AC971d1a678195260c871c384d55ecf3bd','5b5a6debffd9e5fb3ea626da2d868dbf')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


router.get('/send', (req,res) => {
    client.messages.create({
        to: '+639989072373',
        from: '+17202634245',
        body: 'Test Message'
    }, (err, data) => {
        if (err) throw err
        else
        res.status(200).json({ success: true, msg: data });
    });
   
});



module.exports = router;