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

module.exports = getUser