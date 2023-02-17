const users = require('../models/userModel.js');

function getUserId(un, pw) {
    return new Promise((resolve, reject) => {
        users.findOne({username:un, password:pw},(err,data)=>{
            if(err) {resolve("");}
            if (data){resolve(data.id);}
            else {resolve("");}
        });
    });
}

function getUser(in_json){
    return new Promise((resolve, reject) => {
        users.find(in_json,(err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    });
}

module.exports = {getUserId:getUserId, getUser:getUser}