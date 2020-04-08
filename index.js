// Dependencies
// =============================================================
// joe
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
// joe
var app = express();
// 2 different ports one for local machine one for heroku
// joe
var PORT = process.env.PORT || 3000;
// var PORT = 3000;



// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const table = [
    // {
    //         tableNumber: "1",
    //         name: "Joe",
    //         phone: "2061112222",
    //         email: "joe@joe.com",
    //         UniqueID: "abcd"
        
    // }
];

// table.name = $("#name").val()
// table.phone = $("#phone").val()
// console.log(table)

// Restaurant tables (DATA)
// =============================================================
// let table = [
// {
//     tableNumber: "1",
//     name: "Joe",
//     phone: "2061112222",
//     email: "joe@joe.com",
//     UniqueID: "abcd"

// }


// ];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

// 
app.get("/api/currentcustomers", function (req, res) {
    return res.json(table);
});
// URL should be lowercase
app.get("/api/waitinglist", function (req, res) {
    return res.json(waitingList);
});

// empty array for more than 5 tables that we have
const waitingList = [];

// Displays a single character, or returns false
app.get("/api/table/:table", function (req, res) {
    // if (table.length >4){

    // waitingList.push(table);

    // }
    var chosen = req.params.table;

    console.log(chosen);




    for (var i = 0; i < table.length; i++) {
        if (chosen === table[i].name) {
            return res.json(table[i]);
        }
    }

    return res.json(false);
});

// Create New Characters - takes in JSON input
// this function is annonymous , callback function
app.post("/api/table", function (req, res) {

    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    // body is part of the request , so newTable becomes body , capturing that obj
    var newTable = req.body;

    if (table.length > 4) {
        waitingList.push(newTable);

    } else {
        
        table.push(newTable);

    }
    // // Using a RegEx Pattern to remove spaces from newCharacter
    // // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newTable.name = newTable.name.replace(/\s+/g, "").toLowerCase();

    // console.log(newTable);

    // table.push(newTable);

    res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

