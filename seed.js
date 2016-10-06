var mongoose = require('mongoose');
var config = require('./config');
var Recipe = require('./models/recipe')
var seedData = require('./listofrecipes')

mongoose.connect(config.DATABASE_URL, function(err) {
        console.log('connected to database')
        if (err) {
            console.log(err);
        }

        Recipe.remove({}, function(){
            console.log('dropped all records');
            Recipe.collection.insert(seedData, function(err, results){
                if (err) {
                    console.log(err)
                }
                console.log(results.insertedCount + ' recipes added' );
                 process.exit();
            })
        })
    });
    
   