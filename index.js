var express = require("express");
var mySql = require("mysql");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));  //Body parser use json data

var connection = mySql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sampledb"
});
connection.connect(function (error) {
    if (error) {
        console.log("error occured " + error);
    }
    else
        console.log("success");
})
app.get("/", function (req, resp) {

    connection.query("Select name FROM  sample", function (error, result, field) {
        if (!!error) {
            console.log("error in query" + error);
        }
        else {
            //console.log(result);
            resp.json(result);  //send browser to handle response
        }
    });
});
//testing the response of post
app.post("/test", function (req, res) {
    var user_id = req.body.cars[0].models[0];
    console.log(user_id)

});

//testing the response of post using login functionality
app.post('/login', function (req, res) {
    var user = req.body.user;
    var pass = req.body.pass;
    var sql = "SELECT * FROM user where user=? AND pass=?";
    connection.query(sql, [user, pass], function (error, result, field) {
        if (error) throw error;
        res.json(result.user)
        // if (!!!result) {
        //     var obj = new Object();
        //     obj.desription = "succes";
        //     obj.status = "1";
        //     var value = JSON.stringify(obj);
        //     res.json(obj);
        // } else {
        //     res.json(result)
        // }

    });

});

app.listen(1337);



//json used for post request 
// {
//     "name":"John",
//     "age":30,
//     "cars": [
//         { "name":"Ford", "models":[ "Fiesta", "Focus", "Mustang" ] },
//         { "name":"BMW", "models":[ "320", "X3", "X5" ] },
//         { "name":"Fiat", "models":[ "500", "Panda" ] }
//     ]
//  }
// var user_id = req.body.cars[0].name ;