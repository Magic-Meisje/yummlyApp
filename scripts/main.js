var yummlyApp = {};



yummlyApp.getRecipes = function(diet, allergy, userSearch) {
	console.log(userSearch);
	$.ajax({
     url: 'https://api.yummly.com/v1/api/recipes',
     dataType: 'jsonp',
     method: 'GET',
     data: {
         _app_id: '051fb3a8',
         _app_key: '0827bd8424e3ad1432cc27d19823deda',
         requirePictures: true,
         allowedDiet: diet,
         allowedAllergy: allergy,
         q: userSearch,
         allowedCourse: 'course^course-Main Dishes'
		}
	}).then(function(recipes) {
		var recipes = recipes.matches;
		// console.log(recipes);
		
		$.each(recipes, function(i, value) {
			var imageString = value.imageUrlsBySize["90"];
			var recipeImg = imageString.substring(0, imageString.length - 4);
			recipeImg = recipeImg + '400';

			var img = $('<img>').attr('src', recipeImg);
			var recipeName = $('<h3>').text(value.recipeName);
			var rating = $('<p>').text(value.rating + '/5 stars');
			var time = $('<p>').text(value.totalTimeInSeconds/100 + 'min');
			var recipeContainer = $('<a>').addClass('recipeLink').attr('href', 'http://www.yummly.com/recipe/'+ value.id).attr('target', '_blank').append(img, recipeName, rating, time);
			var recipeLink = $('<div>').append(recipeContainer);
			$('#recipeDisplaySection').append(recipeLink);
		});
	});
};

yummlyApp.userDietarySubmit = function() {
	$("#submitButton").on("click", function(e) {
		e.preventDefault();
			if ($('#diets option:selected').attr('data-type') === 'diet') {
				var diet = $("#diets").val();
				var allergy = null
				// console.log(diet);
			} else if ($('#diets option:selected').attr('data-type') === 'allergy') {
				var diet = null
				var allergy = $("#diets").val();
			} 
			// console.log(diet);
			var userSearch = null;
			if ($('#userSearch').val().length > 0) {
				userSearch = $('#userSearch').val();
			}

		yummlyApp.getRecipes(diet, allergy, userSearch);

		$('.container').fadeIn(1000);
		$('.header').hide();
	});
};

yummlyApp.init = function() {
	$('.container').hide();
	yummlyApp.userDietarySubmit();
};

$(function() {
	yummlyApp.init();
});