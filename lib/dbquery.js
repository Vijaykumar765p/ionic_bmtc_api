var configdata = require('../config/config');
var dbmodel = require('../lib/dbquery');


exports.getAllUsers = function (req, conn, cb) {
    var sql_usr = "select * from bmtc.bmtc_user_details";

    conn.query(sql_usr, function (err, result) {
        console.log(err);
        cb(result);
    });
}

exports.getUser = function (req, conn, cb) {
    var uid = (typeof req.params.id !== 'undefined') ? req.params.id : 0;

    if (uid > 0) {
        var sql_usr = "select * from bmtc.bmtc_user_registration where ur_id ='" + uid + "' ";
        conn.query(sql_usr, function (err, result) {
            console.log(err);
            cb(result);
        });
    }
}

exports.getPerticularPassType = function (req, conn, cb) {
    var sql_usr = "SELECT bpd.*, bpt.* FROM bmtc.bmtc_pass_descrptn_type bpd, bmtc.bmtc_pass_typemap bpt where bpd.pd_id = bpt.pd_id and bpt.pt_id='" + req.query.type + "' ";
    conn.query(sql_usr, function (err, result) {
        console.log(err);
        cb(result);
    });
}

exports.doLogin = function (req, conn, cb) {
    var bdobj = JSON.parse(Object.keys(req.body)[0]);

    var email = (typeof bdobj['email'] !== undefined) ? bdobj['email'] : "";
    var password = (typeof bdobj['password'] !== undefined) ? bdobj['password'] : "";

    // var sql_usr = "select * from bmtc.bmtc_user_details where user_email='" + email + "' and user_password='" + password + "' ";
    var sql_usr = "select * from bmtc.bmtc_user_registration where useremail='" + email + "' and userpassword='" + password + "' ";
    conn.query(sql_usr, function (err, rows) {
        var result = [];
        if (rows.length > 0)
        {
            result.push({
                exist: '1',
                mesage: 'Successful Login',
                user_id: rows[0].ur_id
            });

        } else {
            result.push({
                exist: '0',
                message: 'No user found!'
            });
        }
        cb(result);
    });
}

exports.createBMTCID = function (req, conn, cb) {
    var bdobj = JSON.parse(Object.keys(req.body)[0]);

    var fullname = (typeof bdobj['fullname'] !== undefined) ? bdobj['fullname'] : "";
    var emailid = (typeof bdobj['emailid'] !== undefined) ? bdobj['emailid'] : "";
    var mobileno = (typeof bdobj['mobileno'] !== undefined) ? bdobj['mobileno'] : "";
    var password = (typeof bdobj['password'] !== undefined) ? bdobj['password'] : "";

    var sql_usr = "insert into bmtc.bmtc_user_registration (userfullname, useremail, usermob, userpassword) values ('" + fullname + "','" + emailid + "', '" + mobileno + "', '" + password + "')";

    conn.query(sql_usr, function (err, result) {
        console.log(err);
        console.log("1 record inserted");
        cb(result);
    });
}

exports.doRegistration = function (req, conn, cb) {
    var bdobj = JSON.parse(Object.keys(req.body)[0]);
    var fname = (typeof bdobj['fname'] !== undefined) ? bdobj['fname'] : "";
    var lname = (typeof bdobj['lname'] !== undefined) ? bdobj['lname'] : "";
    var gender = (typeof bdobj['gender'] !== undefined) ? bdobj['gender'] : "";
    var dob = (typeof bdobj['dob'] !== undefined) ? bdobj['dob'] : "";
    var address = (typeof bdobj['address'] !== undefined) ? bdobj['address'] : "";
    var photo = (typeof bdobj['photo'] !== undefined) ? bdobj['photo'] : "";
    var sign = (typeof bdobj['sign'] !== undefined) ? bdobj['sign'] : "";

    var sql_usr = "insert into bmtc.bmtc_user_details (first_name, last_name, user_gender, dob, user_address, user_photo,user_sign ) values ('" + fname + "', '" + lname + "', '" + gender + "', '" + dob + "', '" + address + "','"+photo+"','"+sign+"')";

    // console.log(sql_usr);
    conn.query(sql_usr, function (err, result) {
        console.log(err);
        console.log("1 record inserted");
        cb(result);
    });
}