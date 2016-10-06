var mongoose = require('mongoose');
var config = require('./config');
var Recipe = require('./models/recipe')


mongoose.connect(config.DATABASE_URL, function(err) {
        console.log('connected to database')
        if (err) {
            console.log(err);
        }

        Recipe.remove({}, function(){
            console.log('dropped all records');
            process.exit();
        })
    });
    
   