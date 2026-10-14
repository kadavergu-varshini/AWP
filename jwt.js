const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const key = "MySecretKey";
const PORT = 5000;

const dbuser ={
    "username" : "Sriya",
    "password" : "chitti"
};
app.post("/",function(req,res){
    var u = req.query.username;
    var p = req.query.password;
    if(u == dbuser.username && p == dbuser.password)
    {
        jwt.sign(dbuser,key,function(err,token)
        {
            res.json({token});
            res.end();
        });
    }
    else
    {
        res.send("Invalid Credentials");
        res.end();
    }
});
app.listen(PORT,function()
{
    console.log("Server Started: "+PORT);
});