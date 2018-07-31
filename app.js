var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var configdata = require('./config/config');
const cors = require('cors');
var dbmodel = require('./lib/dbquery');

var mysql = require('mysql');

var mysqlconn = mysql.createConnection(configdata.mysqlconnection);
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// GET METHODS
/*----------------------------------------------------------------------------------------------------------*/
//Get all users API
app.get('/users', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getAllUsers(req, mysqlconn, function (result) {
        res.json(result);
    });
});

//Get user by id API
app.get('/users/:id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getUser(req, mysqlconn, function (result) {
        res.json(result);
    });
});

//Get PeriodType by id API
app.get('/periodtype/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getPeriodType(req, mysqlconn, function (result) {
        res.json(result);
    });
});

// Get passttype API
app.get('/getpasstype', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    dbmodel.getPerticularPassType(req, mysqlconn, function (result) {
        res.json(result);
    });
});

/*------------------------------------------------------------------------------------------------------*/
//Login API
app.post('/login', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');

    /*var bdobj=JSON.parse(Object.keys(req.body)[0]);
     console.log(bdobj['email']);
     console.log(bdobj['password']);*/
    //res.json();
    dbmodel.doLogin(req, mysqlconn, function (result) {
        res.json(result);
    });
});

//BMTC id card creation API
app.post('/register', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');

    dbmodel.register(req, mysqlconn, function (result) {
        res.json(result);
    });
});

// SIGN UP API
app.post('/userupdate', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');

    dbmodel.updateUser(req, mysqlconn, function (result) {
        res.json(result);
    });
});

http.createServer(app).listen(2000, function (err) {
    console.log('running server on port 2000');
});

/*-----------------------------------------------------------------------------------------------------------*/
// BMTC SLOTBOOKING APP API's

// GET METHODS

//Get PeriodType by id API
app.get('/places/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getPlace(req, mysqlconn, function (result) {
        res.json(result);
    });
});

app.get('/trip/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getTRIP(req, mysqlconn, function (result) {
        res.json(result);
    });
});

app.get('/tripbusdetails/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.gettripBusDetails(req, mysqlconn, function (result) {
        res.json(result);

    });
});

app.get('/getfromlocationdetails/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getFromLocationDetails(req, mysqlconn, function (result) {
        res.json(result);

    });
});

app.get('/gettolocationdetails/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getToLocationDetails(req, mysqlconn, function (result) {
        res.json(result);

    });
});

app.get('/confirmseats/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.confirmseats(req, mysqlconn, function (result) 
    {
        res.json(result);
    });
});


app.get('/getbusticketdetails/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getbusticketdetails(req, mysqlconn, function (result) 
    {
        res.json(result);
    });
});

app.get('/getbus/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getBUS(req, mysqlconn, function (result) 
    {
        res.json(result);
    });
});


app.post('/bmtcslotlogin', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');

    /*var bdobj=JSON.parse(Object.keys(req.body)[0]);
     console.log(bdobj['email']);
     console.log(bdobj['password']);*/
    //res.json();
    dbmodel.doslotLogin(req, mysqlconn, function (result) {
        res.json(result);
    });
});