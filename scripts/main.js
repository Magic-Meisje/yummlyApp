var yummlyApp = {};

yummlyApp.getRecipes = function(userSearch, diet, allergy) {
	console.log('allergy: ' + allergy);
	$.ajax({
     url: 'https://api.yummly.com/v1/api/recipes',
     dataType: 'jsonp',
     method: 'GET',
     data: {
         _app_id: '051fb3a8',
         _app_key: '0827bd8424e3ad1432cc27d19823deda',
         requirePictures: true,
         q: userSearch,
         allowedDiet: diet,
         allowedAllergy: allergy,
         allowedCourse: 'course^course-Main Dishes'
		}
	}).then(function(recipes) {
		console.log(recipes);
	});
};

// yummlyApp.displayRecipes = function(){

// };


yummlyApp.userDietarySubmit = function() {
	$("#dietarySelection").on("submit", function(e) {
		e.preventDefault();
			if ($('#diets option:selected').attr('data-type') === 'diet') {
				var diet = $("#diets").val();
				var allergy = null
			} else if ($('#diets option:selected').attr('data-type') === 'allergy') {
				var diet = null
				var allergy = $("#diets").val();
			} 
			console.log(diet);
			var userSearch = null;
			if ($('#userSearch').val().length > 0) {
				userSearch = $('#userSearch').val();
			}

		yummlyApp.getRecipes(userSearch, diet, allergy);

		$('main section h3, main section p').fadeIn(1000);
		$('header').addClass('hide');
	});
};

yummlyApp.init = function() {
	$('main section h3, main section p').hide();
	yummlyApp.userDietarySubmit();

};

$(function() {
	yummlyApp.init();
});