const mongoose = require("mongoose");

const url = 'mongodb://127.0.0.1:27017/evenAlerterV2';
mongoose.connect(url);

// ตรวจสอบการเชื่อมต่อ
const db = mongoose.connection;
db.once('open', () => {
    console.log('event adaptor connect :', url);
})

db.on('error', (err) => {
    console.error('connection error T_T :', err);
})

const allBranch=["fdt", "bba", "btech"];// ดิจิตอล บริหาร วิศวะไฟฟ้า
const allGen=[62,63,64,65];// ปีที่สมัครเข้า 


const eventSchema = new mongoose.Schema({//collection record ของนักศึกษา... ทำกิจกรรม... เเล้ว เพื่อให้ง่ายต่อการ searching
    title: { type: String, lowercase: true, trim: true, required: true },
    discribe: { type: String, lowercase: true, trim: true, required: true },
    requireBranch: { type: Array, default: allBranch},
    requireGen:{type: Array, default: allGen},
    start: {
        year: { type: Number, required: true, min: 1 },
        month: { type: Number, required: true, min: 1, max: 12 },
        day: { type: Number, required: true, min: 1, max: 31 },
        hour: { type: Number, required: true, min: 0, max: 23 },
        minites:{ type: Number, require: true, min: 0, max: 59 }
    }
})

module.exports = mongoose.model('events', eventSchema);
//ตัวสร้าง schema ไว้เชื่อต่อ database