const express = require('express');
const router = express.Router()
const getUsers = require('../controller/user_controller.js').getUsers;
const getUserId = require('../controller/user_controller.js').getUserId;
const setUser = require('../controller/user_controller').setUser;
const getEvents = require('../controller/event-controller.js');
const getaAdminId = require('../controller/adminController.js');


// a variable to save a session
var session;

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
async (req, res) => {/**if has log in yet */
    const user = (await getUsers({_id:req.session.userid}))[0];//เอาเเค่ตัวเดียว
    const events = await getEvents({});
    console.log(user.id, "goto dashboard");  
    res.render('dashboard.ejs',{data:{user:user,events:events}});
});

router.get('/admin',(req,res)=>{ /**for render login page */
    res.render('adminLogin.ejs');
});

router.post('/admin/login',  /**for recive data from login form */
async (req,res)=>{
    let id = await getaAdminId(req.body.username, req.body.password);
    if(id===""){
        /** log in fail */
        res.redirect('/admin');
    }else{
        /**login passed */
        session = req.session;
        session.adminid = id;
        console.log('admin',session.adminid,'loged in');
        res.redirect('/adminboard');
    }});

router.get('/adminboard',(req,res,next)=>{
    session = req.session
    if(session.adminid){
        /**has loged in yet */
        next()
    }else{
        /**not has login before */
        res.redirect('/admin');
    }
},async (req,res)=>{
    let users = await getUsers({});
    let events = await getEvents({});
    res.render('adminboard.ejs',{data:{
        users: users,
        events:events
    }});
});

router.get('/user/create', (req,res,next)=>{
    session = req.session
    if(session.adminid){
        next()
    }else{
        res.redirect('/admin');
    }
},(req,res)=>{
    res.render('createUser.ejs');
});

router.get('/user/:id',(req,res,next)=>{
    session = req.session
    if(session.adminid){
        /**has login yet */
        next();
    }else{
        /**has not login yet must go to login*/
        res.redirect('/admin');
    }
},async (req,res)=>{
    let user = (await getUsers({_id:req.params.id}))[0];
    res.render('edituser.ejs',{data:{
        user:user
    }});
});

router.post('/user/update',(req,res,next)=>{
    session = req.session
    if(session.adminid){
        next(); 
    }else{
        res.redirect('/admin');
    }
},async(req,res)=>{
    let in_json = req.body;
    await setUser({_id:in_json.id},in_json).catch((err)=>{res.send("fail to update :",err); res.redirect('/adminboard');});
    res.redirect('/adminboard');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
