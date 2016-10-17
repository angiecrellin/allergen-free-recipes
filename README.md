#Allergen Free Recipes


##Documentation
`GET /recipes` returns a list of all available recipes  
`POST /recipes` These are the properties and these are the values they would take  
```
        {name: string,
        ingredients: array,
        directions: string,
        category: string,
        allergenFree: array,}
```
`PUT /recipes/:id` updates a specific recipe  
```
        {_id: string}
```
`DELETE /recipes/:id` deletes a recipe
```
        {_id: string}
```

##Screenshots


##Summary
This app allows families living with food allergies to search for safe,  
allergen-free recipes. Users simply check the allergens they want to avoid and click  
"Search Recipes". A list of recipes that do not contain the allergens is generated.   
There are options for breakfast, lunch, dinner, snacks and dessert.  
Users can add their own allergen-free recipes by clicking "Add Recipe" and filling in the form.  

Here's a link (https://arcane-citadel-54908.herokuapp.com/) to demo the app.



##Technology
