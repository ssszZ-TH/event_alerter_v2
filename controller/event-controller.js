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

function createEvent(newEvent) {
    return new Promise((resolve, reject) => {
        events.create(newEvent,(err,data)=>{
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function deleteEvent(filter){
    return new Promise((resolve, reject) => {
        events.deleteOne(filter,(err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    })
}

module.exports={
    getEvents:getEvents,
    createEvent:createEvent,
    deleteEvent:deleteEvent
};