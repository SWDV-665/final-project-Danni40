// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/easy-out");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var EasyOut = mongoose.model('EasyOut', {
    name: String,
    message: String,
});


// Get all Easy Out Items items
app.get('/api/easy-out', function (req, res) {

    console.log("Listing for easy-out items...");

    //use mongoose to get all easy-out in the database
    EasyOut.find(function (err, easyout) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(easyout); // return all easyout items in JSON format
    });
});

// Create a easy out Item
app.post('/api/easy-out', function (req, res) {

    console.log("Creating easy-out item...");

    Grocery.create({
        name: req.body.name,
        message: req.body.message,
        done: false
    }, function (err, easyout) {
        if (err) {
            res.send(err);
        }

        // create and return all the easy-out
        EasyOut.find(function (err, easyout) {
            if (err)
                res.send(err);
            res.json(easyout);
        });
    });

});

// Update a easy-out Item
app.put('/api/easy-out/:id', function (req, res) {
    const easyout = {
        name: req.body.name,
        message: req.body.message
    };
    console.log("Updating item - ", req.params.id);
    EasyOut.update({_id: req.params.id}, easyout, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete an easy-out Item
app.delete('/api/easy-out/:id', function (req, res) {
    EasyOut.remove({
        _id: req.params.id
    }, function (err, easyout) {
        if (err) {
            console.error("Error deleting item ", err);
        }
        else {
            EasyOut.find(function (err, easyout) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(easyout);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Easy-Out server listening on port  - ", (process.env.PORT || 8080));