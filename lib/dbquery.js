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
        var sql_usr = "select * from bmtc.bmtc_user_details where user_id ='" + uid + "' ";
        conn.query(sql_usr, function (err, result) {
            console.log(err);
            cb(result);
        });
    }
}

exports.getPeriodType = function (req, conn, cb) {
        var sql_usr = "select * from bmtc.bmtc_period_type";
        conn.query(sql_usr, function (err, result) {
            console.log(err);
            cb(result);
        });
    }
// }

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
        {
            result.push({
                exist: '1',
                mesage: 'Successful Login',
                ur_id: rows[0].user_id,
                username:rows[0].user_email,
                password:rows[0].user_password
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

exports.register = function (req, conn, cb) {
    var bdobj = JSON.parse(Object.keys(req.body)[0]);

    var fname = (typeof bdobj['fname'] !== undefined) ? bdobj['fname'] : "";
    var email = (typeof bdobj['email'] !== undefined) ? bdobj['email'] : "";
    var mobile = (typeof bdobj['mobile'] !== undefined) ? bdobj['mobile'] : "";
    var pwd = (typeof bdobj['pwd'] !== undefined) ? bdobj['pwd'] : "";
    var sql_usr = "insert into bmtc.bmtc_user_details (first_name, user_email, user_mobile, user_password) values ('" + fname + "', '" + email + "', '" + mobile + "', '" + pwd + "')";

    conn.query(sql_usr, function (err, result) {
        console.log(err);
        console.log("1 record inserted");
        cb(result);
    });
}

exports.updateUser = function (req, conn, cb) {
    var bdobj = JSON.parse(Object.keys(req.body)[0]);
    var id = (typeof bdobj['id'] !== undefined) ? bdobj['id'] : "";
    var fname = (typeof bdobj['fname'] !== undefined) ? bdobj['fname'] : "";
    var lname = (typeof bdobj['lname'] !== undefined) ? bdobj['lname'] : "";
    var gender = (typeof bdobj['gender'] !== undefined) ? bdobj['gender'] : "";
    var dob = (typeof bdobj['dob'] !== undefined) ? bdobj['dob'] : "";
    var address = (typeof bdobj['address'] !== undefined) ? bdobj['address'] : "";
    var period = (typeof bdobj['period'] !== undefined) ? bdobj['period'] : "";
    var photo = (typeof bdobj['photo'] !== undefined) ? bdobj['photo'] : "";
    var sign = (typeof bdobj['sign'] !== undefined) ? bdobj['sign'] : "";

    var sql_update = "update bmtc.bmtc_user_details set first_name='" + fname + "',last_name='" + lname + "',user_gender='" + gender + "',dob='" + dob + "',user_address='" + address + "',user_period='" + period + "', user_photo= '"+photo+"',user_sign= '"+sign+"' where user_id='"+id+"'";
    conn.query(sql_update, function (err, result) {
        console.log(err);
        console.log("1 record inserted");
        cb(result);
    });
}