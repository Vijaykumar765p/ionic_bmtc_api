var configdata = require('../config/config');
//var common_function = require('../lib/common_function');
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
        var sql_usr = "select * from bmtc.bmtc_user_registration where bmtc_user_registration.ur_id ='" + uid + "' ";
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

    var sql_usr = "select * from bmtc.bmtc_user_details where user_email='" + email + "' and user_password='" + password + "' ";
    conn.query(sql_usr, function (err, rows) {
        var result = [];
        if (rows.length > 0)
        // if(rows.resultSet>0)
        {
            result.push({
                exist: '1',
                mesage: 'Successful Login'
            });

        } else {
            result.push({
                exist: '0',
                message: 'No user found!'
            });
        }
        // 				Object.keys(result.rows[index]).forEach(function(key) {
        //   			var val = result.rows[index][key];
        //   			console.log('key is: ' + key);
        //   			console.log('val is: ' + val);
        // });
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

    // console.log(sql_usr);
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
    var email = (typeof bdobj['email'] !== undefined) ? bdobj['email'] : "";
    var password = (typeof bdobj['password'] !== undefined) ? bdobj['password'] : "";
    var gender = (typeof bdobj['gender'] !== undefined) ? bdobj['gender'] : "";
    var dob = (typeof bdobj['dob'] !== undefined) ? bdobj['dob'] : "";
    var address = (typeof bdobj['address'] !== undefined) ? bdobj['address'] : "";
    var avatar = (typeof bdobj['avatar'] !== undefined) ? bdobj['avatar'] : "";

    var sql_usr = "insert into bmtc.bmtc_user_details (first_name, last_name, user_email, user_password, user_gender, dob, user_address, user_avatar ) values ('" + fname + "', '" + lname + "', '" + email + "', '" + password + "', '" + gender + "', '" + dob + "', '" + address + "','"+avatar+"')";

    // console.log(sql_usr);
    conn.query(sql_usr, function (err, result) {
        console.log(err);
        console.log("1 record inserted");
        cb(result);
    });
}