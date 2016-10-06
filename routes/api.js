var express = require('express');
var router = express();
router.get('/', function(req, res) {
    res.send('Hello World');
});
module.exports = router;

var Recipe = require('../models/recipe');




router.get('/recipes', function(req, res) {
    Recipe.find(function(err, recipes) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(recipes);
    });
});

router.post('/recipes', function(request, response) {
    if (!request.body.name) {
        return response.status(400).json({
            message: 'no data sent'
        });
    }
    Recipe.create({
        name: request.body.name,
        ingredients: request.body.ingredients,
        directions: request.body.directions,
        category: request.body.category,
        allergenFree: request.body.allergenFree
    }, function(err, recipes) {
        if (err) {
            return response.status(500).json({
                message: 'Internal Server Error'
            });
        }
        response.status(201).json(recipes);
    });
});

router.put('/recipes/:id', function(request, response) {

    if (!request.body.name) {
        return response.status(400).json({
            message: 'no data sent'
        });
    }
    else if (request.body._id !== (request.params.id)) {
        return response.status(400).json({
            message: 'id does not match'
        });
    }


    Recipe.findOneAndUpdate({
        _id: request.params.id
    }, {
        name: request.body.name,
        ingredients: request.body.ingredients,
        directions: request.body.directions,
        category: request.body.category,
        allergenFree: request.body.allergenFree
    }, {
        new: true,
        upsert: true,
    }, function(err, result) {
        if (err) {
            return response.status(404).json({
                message: 'id does not exist'
            });

        }

        response.status(200).json(result);

    });

});

router.delete('/recipes/:id', function(request, response) {

    Recipe.remove({
        _id: request.params.id
    }, function(err) {
        if (err) {
            return response.status(404).json({
                message: 'id does not exist'
            });

        }
        response.status(200).json({});

    });

});

router.get('/recipes/deleteAll', function(request, response) {
    Recipe.remove({}, function(error) {
        if (error) {
            return response.status(400).json({
                message: 'an error occurred'
            });

        }
        response.status(200).json({});
    })
})

router.get('/recipes/search', function(request, response){
    console.log(request.query)
    Recipe.find({'allergenFree': {$all:request.query.allergenFree}}, function(err,results){
        if (err) {
            return response.status(400).json({
                message: 'an error occurred'
            });

        }
        response.status(200).json(results);
    })
})

router.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});