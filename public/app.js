// Mock data - API will return data that looks like this

var MOCK_RECIPES = {
    'recipes': [{
            'name': 'Cherry Chicken Lettuce Wraps',
            'ingredients': [
                '2 tablespoons canola oil, divided',
                '1 1/4 pounds skinless, boneless chicken breast halves, cut into bite-size pieces',
                '1 tablespoon minced fresh ginger root',
                '2 tablespoons rice vinegar',
                '2 tablespoons teriyaki sauce',
                '1 tablespoon honey',
                '1 pound dark sweet cherries, pitted and halved',
                '1 1/2 cups shredded carrots',
                '1/2 cup chopped green onion',
                '1/3 cup toasted and sliced almonds',
                '12 lettuce leaves',
            ],
            'directions': 'Heat 1 tablespoon oil in a large skillet over medium-high heat. Saute chicken and ginger in hot oil until chicken is cooked through, 7 to 10 minutes. Set aside.Whisk vinegar, teriyaki sauce, remaining 1 tablespoon oil, and honey together in a bowl. Add chicken mixture, cherries, carrots, green onion, and almonds; toss to combine.Spoon 1/12 the chicken/cherry mixture onto the center of each lettuce leaf; roll leaf around filling and serve.',
            'category': 'Breakfast',
            'allergenFree': [
                'peanut',
                'treenut',
                'fish',
                'shellfish',
                'soy',
                'wheat',
            ],

        },

    ]
};

/* global $ */
var index = null;



// this will change once API up and running

var getRecipes = function() {
    return $.ajax({
            method: 'GET',
            url: '/api/recipes',
        });
};

// show recipes
var showRecipes = function(data) {
    var $searchResults = $('.results')
    
    data.forEach(function(recipe){
        var template = $('#results-template').html()
        var html=template.replace('{name}', recipe.name)
        .replace('{allergens}', recipe.allergenFree.join(', ') )
        .replace('{category}', recipe.category )
        .replace('{directions}', recipe.directions)
        var $el = $(html)
        recipe.ingredients.forEach(function(ingredient){
          $el.find('.recipeIngredients').append('<li>' + ingredient + '</li>' )
        })
        $searchResults.append($el);
    })
    
    

};

var getAndShowRecipes = function() {
    getRecipes().then(function(results){
        showRecipes(results);
    });
};

getAndShowRecipes();

$(document).ready(function() {
    
    $(".howTo").click(function() {
        $(".overlay").fadeIn(1000);

    });


    $("a.close").click(function() {
        $(".overlay").fadeOut(1000);
    });
    
    
    var $addForm = $('.addForm')
    var $addAnItemContainer = $('.addAnItem')
    $('.add-ingredient').on('click', function(event) {
        event.preventDefault();
        $addAnItemContainer.append($('<input>', {
            'class': 'item'
        }))
    })



    $addForm.on('submit', function(event) {
        event.preventDefault();
        var data = {
            'name': $addForm.find('[name=name]').val(),
            'category': $addForm.find('[name=category]').val(),
            'ingredients': getInputIngredients(),
            'directions': $addForm.find('[name=directions]').val(),
            'allergenFree': getInputAllergens(),


        };

        console.log(data);


        createNewRecipe(data).then(function(data) {
            console.log(data);


        });
        
        

        resetForm();

    })

    
        function resetForm() {
        $('.addForm').trigger("reset");
        $('.addForm').find('.item:not(:first-child)').remove();
        }

    $('.addRecipe').click(function() {
        $('#add-recipe').show();
    })

    function getInputIngredients() {
        var data = [];
        $addForm.find('.addAnItem .item').each(function() {
            var $item = $(this)
            if ($item.val() !== '') {
                data.push($item.val());
            }

        })
        return data;


    }

    function getInputAllergens() {
        var data = [];
        $addForm.find('.allergenInput:checked').each(function() {
            var $item = $(this)
            data.push($item.val());


        })
        return data;

    }

    function createNewRecipe(data) {
        return $.ajax({
            method: 'POST',
            url: '/api/recipes',
            data: JSON.stringify(data),
            contentType: 'application/json'
        });
    }
})
