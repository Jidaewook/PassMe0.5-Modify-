const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const path = require("path");

const passport = require('passport');

const ncsRoute = require('./Route/ncs');
const psatRoute = require('./Route/psat');
const userRoute = require('./Route/user');
const profileRoute = require('./Route/profile');
const noticeRoute = require('./Route/notice');
const bbsRoute = require('./Route/bbs');

const app = express();
require('./config/database');

app.use(cors());
app.use(morgan('dev'));
app.use('./uploads/', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
require("./config/passport")(passport);


app.use('/lecture/ncs', ncsRoute);
app.use('/lecture/psat', psatRoute);
app.use('/users', userRoute);
app.use('/profile', profileRoute);
app.use('/notice', noticeRoute);
app.use('/bbs', bbsRoute);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
    next();
});

app.use(async function (err, req, res, next) {
    console.error(err.message);
    await res.status(500).json({
        error: err.message
    });
    next();
});

if (process.env.NODE_ENV || "production" === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

