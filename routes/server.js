var mongo = require('mongodb').MongoClient;
var express = require('express');
var router = express.Router();

mongo.connect('mongodb://127.0.0.1/entries', function(err, db){
    router.post('/', function(req, res) {
        if(err) throw err;

        //
        var col = db.collection('entries');

        if(req.body.word){

            col.aggregate([
                {$match: { word: req.body.word } }

            ], function(err, result){
                if(err) throw err;
                res.contentType('json');
                res.send('suggestions', result);
            });
        } else {
            console.log("typed is set");

            var regex = new RegExp("^" + req.body.typed);
            col.aggregate([
                {$match: { word: regex } },
                {$project:{word: 1}},
                {$group:{_id:"$word"}},
                {$limit:20}
            ], function(err, result){
                if(err) throw err;
                res.contentType('json');
                res.send('suggestions', result);
            });
        }

    });
});

module.exports = router;

