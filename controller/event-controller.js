const events = require('../models/eventModel.js');

function getEvents(in_json){
    //ทำต่อ
    return new Promise((resolve, reject) => {
        events.find(in_json,(err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    });
}

module.exports=getEvents;