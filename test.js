users = require('./models/userModel.js');

users.findOne({ username: "sp", password: "pass" }, (err, data) => {
    if (err) { return console.log("have problem to fetching database"); }
    console.log(data); // not found u get null
})