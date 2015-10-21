var yummlyApp = {};



yummlyApp.getRecipes = function() {
	var vegan = $().val();
	var paleo = $().val();
	var vegetarian = $().val();
	var glutenFree = $().val();
	var dairy = $().val();
	var wheat = $().val();
	var soy = $().val();
	var seafood = $().val();

	$.ajax({
		url: 'https://api.yummly.com/v1/api/recipes',
		dataType: 'jsonp',
		method: 'GET',
		data: {
			_app_id: '051fb3a8',
			_app_key: '0827bd8424e3ad1432cc27d19823deda',
			allowedCourse: 'Main Dishes',
			allowedDiet: vegetarian,
			allowedDiet: vegan,
			allowedAllergy: glutenFree,
			allowedAllergy: dairy,
			allowedAllergy: wheat,
			allowedAllergy: soy,
			allowedAllergy: seafood
		}
	}).then(function(recipes) {
		console.log(recipes);
	});
};



yummlyApp.init = function() {
	yummlyApp.getRecipes();
};

$(function() {
	yummlyApp.init();
});