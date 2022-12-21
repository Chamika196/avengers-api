const express =  require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

//endpoint to create users

router.post("/",async(req,res) => {
    let salt = await bcrypt.genSalt(10);   //10 mean how many time need to generate salt
   let hashpw = await bcrypt.hash(req.body.password, salt)
    let user = new User({
        username: req.body.username,
        password: hashpw,
        isAdmin: req.body.isAdmin
    })
    await user.save()
    return res.send({
        username: user.username,
        isAdmin: user.isAdmin,
    });

});

module.exports = router;