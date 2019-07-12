/*
# Psuedo coding

## When the page is loaded
  * Display text box with submit button -- check

## When user input text inside text button and click submit button
  * Dynamically generate button with the text user inputed in the text box.
  * Append new button to the previous button

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
var topics = ["dog", "cat", "duck", "cow"];


// function
// ==========================================
// function to display buttons
function buttonGenerator() {
  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $(".button-group").empty();
  // for loop topics array 
  for(var i = 0; i < topics.length; i++) {
    // add buttons only if there is some kind of input, and if it is not a duplicate
    // is it a better idea to use this concept when the input is added to the topics array?
      var gifButtons = $('<button type="submit" class="btn btn-primary">'+ topics[i] + '</button>');
  
      $(".button-group").append(gifButtons);
    // if(topicInput !== empty && topicInput === duplicate) {


    // }

  }

}

$(".topic-submit").on("click", function(event){

  event.preventDefault();
  // the text user inputed inside #inputTopic textbox.
  var topicInput = $("#inputTopic").val().trim();
  console.log(topicInput);
  if (topicInput != "" && !topics.includes(topicInput)) {

  // push the #inputTopic's value as a string in topics array.
  topics.push(topicInput);

  buttonGenerator();
  }

});


buttonGenerator();
// If I keep click on submit button, it makes the button on top of the existing button.
// Whenever I click on the submit button, I have to push the topic to topics array, however delete current topic buttons and regenerate them.




