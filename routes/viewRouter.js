const express = require('express');
const router = express.Router()
const users = require('../models/userModel.js');

// a variable to save a session


router.get('/views/app.css', (req, res) => {
    res.sendFile('../views/app.css', { root: __dirname });
});

//หน้าที่ check ว่า ต้อง มีการ auth ป่าว หรือว่าไม่ต้อง auth ละ
router.get('/', (req, res) => { 
    session = req.session;
    if (session.userid) {
        console.log(req.session)
        res.send("<a href=\'/logout'>click to logout</a>");
    } else
        res.render('login.ejs'); // the most beutiful login ever (may be) 
});


//check on database
function getUserId(un, pw) {
    return new Promise((resolve, reject) => {
        users.findOne({username:un, password:pw},(err,data)=>{
            if(err) {resolve("");}
            if (data){resolve(data.id);}
            else {resolve("");}
        });
    });
}

function getUser(){

}

var session;

//login api ไม่สามารถ get ปกติได้
router.post('/login', async (req, res)=>{ 
    //console.log("in the session :",req.session);
    //if (req.body.username == myusername && req.body.password == mypassword) { // ไว้เเเบบ ไม่มี database
    let id = await getUserId(req.body.username, req.body.password)
    console.log(id);
    if(id) {
        session=req.session;
        session.userid = id;
        res.redirect('/dashboard');
    }
    else{
        res.render('login.ejs');
    } 
})


router.get('/dashboard',
(req,res,next)=>{ //after dashboard
    session = req.session;
    if (session.userid){
        //res.send('now loading dashboard . . .');
        next();//เข้าสู่ dashboard จริงๆ
    }else{
        res.send('U must login before use dashboard<br> <a href="/">login</a>');
    }
}, 
(req, res) => {// real dashboard
    res.send('this is dashboard')
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;