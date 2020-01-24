const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');
const auth  = require('./routes/auth');
const app = express();
const port = 3600;
const twilioSms = require('./routes/twiliosms');

mongoose.connect(config.database, { useNewUrlParser: true , useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.use(cors());

mongoose.set('useFindAndModify', false);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/sms', twilioSms);
app.use('/users', users);
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});


app.listen(port, () => {
    console.log('Server started on port '+ port);
});




