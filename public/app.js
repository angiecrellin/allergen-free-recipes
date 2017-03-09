/* global $ */
var index = null;

function getSearchResults(data) {
    return $.ajax({
        method: 'GET',
        url: '/api/recipes/search',
        data: data,

    });
}

var showRecipes = function(data) {
    var $searchResults = $('.results');

    data.forEach(function(recipe) {
        var template = $('#results-template').html();
        var html = template.replace('{name}', recipe.name)
            .replace('{allergens}', recipe.allergenFree.join(', '))
            .replace('{category}', recipe.category)
            .replace('{directions}', recipe.directions);
        var $el = $(html);
        recipe.ingredients.forEach(function(ingredient) {
            $el.find('.recipeIngredients').append('<li>' + ingredient + '</li>')
        });
        $searchResults.append($el);
    });

    $searchResults.show();

};

var clearRecipes = function() {
    $('.results').html('').hide();

};

var getAndShowRecipes = function() {
    getSearchResults().then(function(results) {
        showRecipes(results);
    });
};

$(document).ready(function() {

    $('.search-form').on('submit', function(event) {
        event.preventDefault();
        
        var data = getInputAllergens($('.search-form'));
        
        if (data == "") {
        alert("Please Choose at Least One Allergen to Avoid");
        }
        console.log(data);
        getSearchResults({
            allergenFree: data
        }).then(function(results) {
            showRecipes(results);
        });

    });

    $('.new').on('click', function(event) {
        event.preventDefault();
        $('.search-form').get(0).reset();
        clearRecipes();
    });

    $(".howTo").click(function() {
        $(".overlay").fadeIn(1000);

    });


    $("a.close").click(function() {
        $(".overlay").fadeOut(1000);
    });


    var $addForm = $('.addForm');
    var $addAnItemContainer = $('.addAnItem');
    $('.add-ingredient').on('click', function(event) {
        event.preventDefault();
        $addAnItemContainer.append($('<input>', {
            'class': 'item'
        }));
    });


    $addForm.on('submit', function(event) {
        event.preventDefault();
        var data = {
            'name': $addForm.find('[name=name]').val(),
            'category': $addForm.find('[name=category]').val(),
            'ingredients': getInputIngredients(),
            'directions': $addForm.find('[name=directions]').val(),
            'allergenFree': getInputAllergens($addForm),


        };

        console.log(data);


        createNewRecipe(data).then(function(data) {
            console.log(data);


        });

        resetForm();

    });


    function resetForm() {
        $('.addForm').trigger("reset");
        $('.addForm').find('.item:not(:first-child)').remove();
    }

    $('.addRecipe').click(function() {
        $('#add-recipe').show();
    });

    function getInputIngredients() {
        var data = [];
        $addForm.find('.addAnItem .item').each(function() {
            var $item = $(this);
            if ($item.val() !== '') {
                data.push($item.val());
            }

        });
        return data;

    }

    function getInputAllergens($form) {
        var data = [];
        $form.find('.allergenInput:checked').each(function() {
            var $item = $(this);
            data.push($item.val());

        });
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
});
