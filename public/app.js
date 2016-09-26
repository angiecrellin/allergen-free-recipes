// Mock data - API will return data that looks like this

var MOCK_RECIPES = {
    'recipes': [
        {
            'id': 111111111,
            'text': 'Breakfast Recipe',
            
        },
        
        {
            'id': 222222222,
            'text': 'Lunch Recipe',
        },
        
        {
            'id': 333333333,
            'text': 'Dinner Recipe',
        },
        
        {
            'id': 444444444,
            'text': 'Snack Recipe',
        },
        
        {
            'id': 5555555555,
            'text': 'Dessert Recipe',
        },
    ]
};
/* global $ */
var index = null;

// this will change once API up and running

var getRecipes = function(callbackFn){
    setTimeout(function(){callbackFn(MOCK_RECIPES)}, 100);
};

// show recipes
var showRecipes = function(data){
    for (index in data.recipes) {
       $('.results').append('<p>' + data.recipes[index].text + '</p>');
    }
    
};

var getAndShowRecipes = function(){
    getRecipes(showRecipes);
};

getAndShowRecipes();
    
