const express = require('express');
const router = express.Router()
const users = require('../models/userModel.js');
const getUser = require('../controller/user_controller.js').getUser;
const getUserId = require('../controller/user_controller.js').getUserId;
// a variable to save a session


router.get('/views/app.css', (req, res) => {
    res.sendFile('../views/app.css', { root: __dirname });
});

//หน้าที่ check ว่า ต้อง มีการ auth ป่าว หรือว่าไม่ต้อง auth ละ
router.get('/', (req, res) => { 
    session = req.session;
    if (session.userid) {
        res.redirect('/dashboard');
    } else
        res.render('login.ejs'); // the most beutiful login ever (may be) 
});




var session;

//login api ไม่สามารถ get ปกติได้
router.post('/login', async (req, res)=>{ 
    //console.log("in the session :",req.session);
    //if (req.body.username == myusername && req.body.password == mypassword) { // ไว้เเเบบ ไม่มี database
    let id = await getUserId(req.body.username, req.body.password)
    //console.log(id);
    if(id) {
        session=req.session;
        session.userid = id;
        console.log(session,"has loged in\n");
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
        //res.send('U must login before use dashboard<br> <a href="/">login</a>'); // ปัญญาออ่นไป
        res.redirect('/');
    }
}, 
async (req, res) => {// real dashboard
    const user = (await getUser({id:session.userid}))[0];//เอาเเค่ตัวเดียว
    res.render('dashboard.ejs',{data:{user:user}});
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
