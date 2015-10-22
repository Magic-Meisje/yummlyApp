var yummlyApp = {};



yummlyApp.getRecipes = function() {
	$.ajax({
		url: 'https://api.yummly.com/v1/api/recipes',
		dataType: 'jsonp',
		method: 'GET',
		data: {
			_app_id: '051fb3a8',
			_app_key: '0827bd8424e3ad1432cc27d19823deda',
			allowedCourse: 'course^course-Main Dishes',
			allowedDiet: yummlyApp.userDietSelection,
			allowedAllergy: yummlyApp.userAllergySelection,
			q: yummlyApp.userInputSearch
		}
	}).then(function(recipes) {
		console.log(recipes);
	});
};

yummlyApp.userDietarySubmit = function() {
	$("#dietarySelection").on("submit", function(e) {
		e.preventDefault();
		if ($('#diets').val() === 'vegan' || 'vegetarian') {
			yummlyApp.userDietSelection = $("#myDropdown").val();
		} else if ($('#diets').val() === 'glutenFree' || 'dairy') {
			yummlyApp.userAllergySelection = $("#myDropdown").val();
		} 
	
		yummlyApp.userInputSearch = $('#userSearch').val();
		console.log(yummlyApp.userInputSearch);
	
		yummlyApp.getRecipes();

		$('main section').removeClass('hide');
		$('header').addClass('hide');
	});
};

yummlyApp.init = function() {
	yummlyApp.userDietarySubmit();

};

$(function() {
	yummlyApp.init();
});