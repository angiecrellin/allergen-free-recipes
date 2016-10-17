var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    directions: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    allergenFree: [{
        type: String,
        required: true
    }]
});

var Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;