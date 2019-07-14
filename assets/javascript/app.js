/*
# Psuedo coding

## When the page is loaded
  * Display text box with submit button -- check

## When user input text inside text button and click submit button
  * Dynamically generate button with the text user inputed in the text box. -- check
  * Append new button to the previous button -- check

## When user click on the dynamically generated button
  * Using Giphy API, get the data related to the name of the button clicked -- check
    * Using the data, generate 10 GIFs and their metadata (rating, title, tags, etc) for each GIFs and display them. -- check

  * The GIFs should be static when they are first displayed. -- check
    * Clicking on the static GIF animate it by changing the URL of the static gif to animated gif. -- check
    * Clicking on the animated GIF make it static by changing the URL of the animmated gif to static gif. -- check

## More Gifs button clicked
  * Display 10 more gifs to the page without overwriting existing gifs. (prepend)

## Favorite button clicked
  * Store the gif and it's metadata when it's favorite button is clicked to the favorite section.

*/

// variables
// ==========================================
// Store the topic keywords from input box. Gif generator buttons will be made using this array.
var topics = [];

// ==========================================
$(".topic-submit").on("click", function(event){

  event.preventDefault();
  // the value user inputted inside #inputTopic textbox.
  var topicInput = $("#inputTopic").val().trim();
  // if the user inputted value is not an empty string and also does not have duplicates in topics array
  if (topicInput != "" && !topics.includes(topicInput)) {
    // push the #inputTopic's value as a string in topics array.
    topics.push(topicInput);
    // buttonGenerator();
  }
  // ??: Does not seem to matter if the function is placed in if statment or outside of it.
  buttonGenerator();

});

// let's write ajax call to get the data when the dynamically created button is clicked.
$(document).on("click", ".button-topics", gifGenerator);

buttonGenerator();

// function
// ==========================================

// function to display buttons
function buttonGenerator() {
  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise the previous buttons will remain and newly made buttons will be added on top of them.)
  $(".button-group").empty();

  // for loop topics array 
  for(var i = 0; i < topics.length; i++) {
      var gifButtons = $('<button type="submit">'+ topics[i] + '</button>');
      gifButtons.addClass("btn btn-primary button-topics");
      gifButtons.attr("data-topics", topics[i]);
      $(".button-group").append(gifButtons);
  }

}

function gifGenerator() {
  // topic variable is the value of data-topics of the button that is clicked on.
  var topic = $(this).attr("data-topics");
  var limit = 10
  // var page = 0
  // page += 1;
  // console.log(page);
  // var offset = (page * limit)

  // console.log(offset);
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ba6zqaYk7V3NBpJPJXcg5yTDeEf7V0bQ&q=" + topic + "&limit=" + limit;
  
  

  $.ajax({
    url: queryURL,
    method: "GET",
  })
    .then(function(res){

      console.log(res);
      for(var i = 0; i < limit; i++) {

        var gifStillURL = res.data[i].images.fixed_height_still.url;
        var gifAnimateURL = res.data[i].images.fixed_height.url;
        var gifRating = $("<p>").text("Rating: " + res.data[i].rating);
        gifRating.addClass("card-text");
        var gifTitle = $("<h5>").text("Title: " + res.data[i].title);
        gifTitle.addClass("card-title");
       
        // img (gif) element with below attributes and class
        var cardDiv = $("<div>");
        cardDiv.addClass("card");

        var cardBody = $("<div>");
        cardBody.addClass("card-body");

        var img = $("<img>");
        img.attr("src", gifStillURL);
        img.attr("data-still", gifStillURL);
        img.attr("data-animate", gifAnimateURL);
        img.attr("data-state", "still");
        img.addClass("card-img-top img-adjusted gif");
       
        cardDiv.append(img);
        cardDiv.append(cardBody);
        cardBody.append(gifTitle);
        cardBody.append(gifRating);
        // favorite button 
        var favBtn = $("<button>");
        favBtn.attr("data-favorite", i);
        favBtn.addClass("btn btn-dark fav-button");
        favBtn.text("♥");

        cardDiv.append(favBtn);


        // meta data rating, title, tags, etc
        // <div class="card">
        //   <img src="..." class="card-img-top">
        //   <div class="card-body">
        //     <h5 class="card-title">Card title</h5>
        //     <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        //     <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        //   </div>
        // </div>


        $(".gif-container").prepend(cardDiv);


      }
    });

  
}

// How to request and display more gifs?
/*
# Request more gifs when the topic button is clicked on
  # increase offset as the topic button is clicked on
  # update the offset on the queryURL to get the new gifs.
  # How do I increase offset only when the same topic button is clicked more than once?
  # How do I reset offset when new topic button is clicked?

# Make another button to request more gifs and request more gifs when it's clicked on.
  # How do I tell the moreRequest button to get the same data that was requested previously?
    * Maybe, if I save the topic (what user inputted in the search box) in local storage and retrieve it when I click on moreRequest button?
    * start the offset as 10 ( or should it be 11?) to avoid getting the data from offset 0~9(or is it 1~10).
*/
function moreGifs() {

}

$(document).on("click", ".gif", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});



// make favorite gif when the heart button is clicked.
// Using local storage, make a functioning favorite button
/*
# Have the heart button numbers corresponding to it's data's order. (data-favorite, i)
# When the heart button is clicked, the datas needed (url, title, tag, rating) of the gif (find it by using res.data[$(this).attr("data-favorite")]) is saved in local storage
# with the data stored, using the title of the gif, make a favorite gif button.
# When the button is clicked, request gif that has the same title and url, and display it.

# When favorite button of a gif is clicked,
  * store the still, animate, rating, title and favorite history data in local storage.
  * dynamically create button with class "favorite-gif" that stores above information and named as the title of the gif.
  * Also save the favorite-gif button in local storage so it does not get lost when the page refreshes or closed.
  * 
# When the favorite-gif button is clicked
  * Using the data stored in the button, search the gif user added as favorite.
  * Let's remove all previously displayed gifs to clear the gif container and then display the favorite gif when it's clicked.
  * 

*/


// Also make favorite topic
/*

# Type value in the text box
# click "add as favorite topic" button instead of submit
# saved as a button in favorite topic section.

*/

