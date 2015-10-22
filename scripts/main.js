var yummlyApp = {};



yummlyApp.getRecipes = function() {
	var UserDiet = null;
	var UserAllergy = null;

	$.ajax({
		url: 'https://api.yummly.com/v1/api/recipes',
		dataType: 'jsonp',
		method: 'GET',
		data: {
			_app_id: '051fb3a8',
			_app_key: '0827bd8424e3ad1432cc27d19823deda',
			allowedCourse: 'course^course-Main Dishes',
			allowedDiet: UserDiet,
			allowedAllergy: UserAllergy
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