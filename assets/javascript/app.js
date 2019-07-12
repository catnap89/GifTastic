/*
# Psuedo coding

## When the page is loaded
  * Display text box with submit button -- check

## When user input text inside text button and click submit button
  * Dynamically generate button with the text user inputed in the text box. -- check
  * Append new button to the previous button -- check

## When user click on the dynamically generated button
  * Using Giphy API, get the data related to the name of the button clicked
    * Using the data, generate 10 GIFs and their metadata (rating, title, tags, etc) for each GIFs and display them.

  * The GIFs should be static when they are first displayed.
    * Clicking on the static GIF animate it by changing the URL of the static gif to animated gif.
    * Clicking on the animated GIF make it static by changing the URL of the animmated gif to static gif.

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
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ba6zqaYk7V3NBpJPJXcg5yTDeEf7V0bQ&q=" + topic + "&limit=" + limit;

  $.ajax({
    url: queryURL,
    method: "GET",
  })
    .then(function(res){

      console.log(res);
      for(var i = 0; i < limit; i++) {

        var gifURLs = res.data[i].images.fixed_height.url

        var gif = $("<img>");

        //
        gif.attr("src", gifURLs);
        // img.attr("alt", "cat image");

        //
        $(".gif-container").prepend(gif);


      }
    });
}


