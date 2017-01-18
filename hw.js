$(function() {
    //do on page load
    populateButtons(food, 'foodButton', '#foodButtons');
});

var food = ["pizza", "hot dogs", "tacos", "sushi", "burgers", "chips", "cheese"];

//function to make buttons and add to page
function populateButtons(arrayToUse, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++){
        var a = $('<button>')
        a.addClass(classToAdd);
        a.attr('data-type', arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    }

}

$(document).on('click', '.foodButton', function(){
    $('#food').empty();
    $('.foodButton').removeClass('active');
    $(this).addClass('active');

    var type = $(this).data('type');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) { // when it is done it will return the response of the object 
         var results = response.data;

         for(var i=0; i < results.length; i++){
             var foodDiv = $('<div class="food-item">')

             var rating = results[i].rating;

             var p = $('<p>').text( "Rating: " + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var foodImage = $('<img>');
             foodImage.attr('src', still);
             foodImage.attr('data-still', still);
             foodImage.attr('data-animate', animated);
             foodImage.attr('data-state', 'still')
             foodImage.addClass('foodImage');

             foodDiv.append(p)
             foodDiv.append(foodImage)

             $('#food').append(foodDiv);
         }
        
    }); 
});

$(document).on('click', '.foodImage', function(){
    var state = $(this).attr('data-state'); //.data('state') won't work the way we expect
    
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addFood').on('click', function(){
    var newFood = $('input').eq(0).val();

    if (newFood.length > 2){
        food.push(newFood);
    }

    populateButtons(food, 'foodButton', '#foodButtons');

    return false;
});