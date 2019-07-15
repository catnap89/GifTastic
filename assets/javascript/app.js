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
  * Display 10 more gifs to the page without overwriting existing gifs. (prepend) - check

## Favorite buttons
  # Favorite topic buttons
    * when user input some value inside textbox and click add as favorite button
      * make favorite topic button -- check
      * when the favorite topic button is clicked, display 10 gifs that are related to the value of the favorite topic button -- check
  # Favorite gif button
    * Store the gif and it's metadata when it's favorite button is clicked to the favorite section.

*/

// VARIABLES
// ==========================================
// Store the topic keywords from input box. Gif generator buttons will be made using this array.
var topics = [];
// this is for the moreGifs function so that it can only run when var condition is true.
// change var condition to true when renderGif function was called so that moreGifs can only be called after renderGif was called.
var condition = false;
/*
 lets think of this as a book with pages. after 10 data, user moves to new page that also have 10 data
 having this variable inside moreGif function was causing issue because I want to increase page by 1 so that offset increase by 10 each time I call the function.
 If page = 0 is inside function, each time function run, page value will reset to 0 and does not increase no matter how many times the function is called.
*/
var page = 0;

var favoriteGifTitle = [];
var favoriteGifId = [];

// ON CLICK METHODS
// ==========================================
// on click function to push textbox's value in topics array and call renderButton function
$(".topic-submit").on("click", function(event){

  event.preventDefault();
  // the value user inputted inside #inputTopic textbox.
  var topicInput = $("#inputTopic").val().trim();
  // if the user inputted value is not an empty string and also does not have duplicates in topics array
  if (topicInput != "" && !topics.includes(topicInput)) {
    // push the #inputTopic's value as a string in topics array.
    topics.push(topicInput);
    
  }
  // ??: Does not seem to matter if the function is placed in if statment or outside of it.
  renderButton();
  // Clear the textbox when done
  $("#inputTopic").val("");

});


renderButton();

// on click function to grab the data attributes of the heartbutton that is clicked and renderButtons using the data attributes.
$(document).on("click", ".heart-button", function(event) {
  event.preventDefault();
  // grab the data-id attribute's value of the heartbutton that was clicked on
  var dataId = $(this).attr("data-id");
  var dataTitle = $(this).attr("data-title");

  if (!favoriteGifId.includes(dataId)) {
    favoriteGifId.push(dataId);
  }

  if (!favoriteGifTitle.includes(dataTitle)) {
    favoriteGifTitle.push(dataTitle);
  }

  // update the favoriteGifButton on the page
  renderFavoriteGifButton(favoriteGifTitle);

  // Save the favorite gif buttons into localstorage.
  // We need to use JSON.stringify to turn the list from an array into a string
  localStorage.setItem("favorite-gif-title", JSON.stringify(favoriteGifTitle));
  localStorage.setItem("favorite-gif-id", JSON.stringify(favoriteGifId));




})

// When a user clicks a x button then delete the specific content
  $(document).on("click", ".checkbox-gif", function() {
    // Get the number of the button from its data attribute and hold in a variable called removeFavoriteNumber.
    var removeFavoriteNumber = $(this).attr("data-remove-favorite");

    // Deletes the item marked for deletion
    favoriteGifTitle.splice(removeFavoriteNumber, 1);
    favoriteGifId.splice(removeFavoriteNumber, 1);

    // Update the favorite gif button on the page
    renderFavoriteGifButton(favoriteGifTitle);

    // Save the favorite-topic into localstorage.
    // We need to use JSON.stringify to turn the list from an array into a string
    localStorage.setItem("favorite-gif-title", JSON.stringify(favoriteGifTitle));
    localStorage.setItem("favorite-gif-id", JSON.stringify(favoriteGifId));
  });

  // Load the favorite-topic from localstorage.
  // We need to use JSON.parse to turn the string retrieved  from an array into a string
  var favoriteGifTitle = JSON.parse(localStorage.getItem("favorite-gif-title"));
  var favoriteGifId = JSON.parse(localStorage.getItem("favorite-gif-id "));

  // Checks to see if the favoriteGifTitle exists in localStorage and is an array currently
  // If not, set a local favoriteGifTitle variable to an empty array
  // Otherwise favoriteGifTitle is our current favoriteGifTitle of favorite-gif-Title
  if (!Array.isArray(favoriteGifTitle)) {
    favoriteGifTitle = [];
  }

  if (!Array.isArray(favoriteGifId)) {
    favoriteGifId = [];
  }
    
renderFavoriteGifButton(favoriteGifTitle);

// on click function to push textbox's value in list array and call renderFavoriteButton function and save list array in localstorage as string.
$(".add-favorite-topic").on("click", function(event) {
    event.preventDefault();

    // Get the inputTopic "value" from the textbox and store it as a variable
    var topicInput = $("#inputTopic").val().trim();

    if (topicInput != "" && !list.includes(topicInput)) {
      
      list.push(topicInput);

    }

    // Update the favorite topic buttons on the page
    renderFavoriteButton(list);

    // Save the favorite topic buttons into localstorage.
    // We need to use JSON.stringify to turn the list from an array into a string
    localStorage.setItem("favorite-topic", JSON.stringify(list));

    // Clear the textbox when done
    $("#inputTopic").val("");
    
  });

// When a user clicks a x button then delete the specific content
  $(document).on("click", ".checkbox", function() {
    // Get the number of the button from its data attribute and hold in a variable called removeFavoriteNumber.
    var removeFavoriteNumber = $(this).attr("data-remove-favorite");

    // Deletes the item marked for deletion
    list.splice(removeFavoriteNumber, 1);

    // Update the favorite topic button on the page
    renderFavoriteButton(list);

    // Save the favorite-topic into localstorage.
    // We need to use JSON.stringify to turn the list from an array into a string
    localStorage.setItem("favorite-topic", JSON.stringify(list));
  });

  // Load the favorite-topic from localstorage.
  // We need to use JSON.parse to turn the string retrieved  from an array into a string
  var list = JSON.parse(localStorage.getItem("favorite-topic"));

  // Checks to see if the favorite-topic exists in localStorage and is an array currently
  // If not, set a local list variable to an empty array
  // Otherwise list is our current list of favorite-topic
  if (!Array.isArray(list)) {
    list = [];
  }
    
renderFavoriteButton(list);





// let's write ajax call to get the data when the dynamically created button is clicked.
$(document).on("click", ".button-topics", renderGif);
$(document).on("click", ".favorite-topic", renderGif);
// on click method to call moreGifs function that requests 10 more gifs that are not duplicates of previous gifs.
$(".request-gifs").on("click", moreGifs);


// FUNCTIONS
// ==========================================

// function to display topic buttons
function renderButton() {
  
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

// functino to use button's data-topics attribute to request certain data from API and dynamically create gifs and it's metadata inside card.
function renderGif() {
  condition = true;
  page = 0;
  // topic variable is the value of data-topics of the button that is clicked on.
  var topic = $(this).attr("data-topics");
  // give .request-gifs button the data-topic attribute with the value of the variable topic (the topic button's data-topics attribute's value. If user inputted dog in text box to make Dog topic button, the data-topics value will be dog. That dog value will be set as .request-gifs button's data-topic value.)
  $(".request-gifs").attr("data-topic", topic);
  var limit = 10

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
        var heartBtn = $('<button type="submit">');
        // data-id and data-title attributes will be used for favorite gif button.
        var gifId = res.data[i].id;
        var gifTitle = res.data[i].title;
        heartBtn.attr("data-id", gifId);
        heartBtn.attr("data-title", gifTitle);
        heartBtn.addClass("btn btn-dark heart-button");
        heartBtn.text("♥");

        cardDiv.append(heartBtn);

        $(".gif-container").prepend(cardDiv);

      }
    });

  
}


/*
How to request and display more gifs?
  # When More Gifs button (.request-gifs) is clicked
    # How do I tell the .gif-request button to get the same data that was requested previously?
      * Maybe, if I save the topic (what user inputted in the search box) in local storage and retrieve it when I click on moreRequest button?
      * start the offset as 10 ( or should it be 11?) to avoid getting the data from offset 0~9(or is it 1~10).
      * FORGET ABOUT LOCAL STORAGE and above ideas. Not deleting this comment above so I can remember what kind of thought process I had in mind.
    # THIS IS THE IDEA I WENT FOR
      * When the topic button is clicked (Ex: Dog button), it request data regarding DOG by using it's value.
      * When the topic button is clicked, let's have our .request-gifs button to have data-topic value of topic button's value.
      * moreGifs function should only be called only when user submitted a topic of gifs they want, and the topic button is clicked to show first set of gifs. So then, .request-gifs button can call moreGifs function upon click to show more gifs related to previous gifs.
      * 
*/

function moreGifs() {

  event.preventDefault();
  // Only call this function if renderGif function is called to change condition variable as true.
  if (condition == true) {
    // increasing page by one each time the function is called
    page++;
    var limit = 10
    // offset is like a bookmark on the page. This is to show next set of gifs starting from the Offset.
    var offset = page * limit;
    // The renderGif function gives .request-gifs button with data-topic attribute with the value of the button that is being clicked on. (if dog button is clicked, data-topic of .request-gifs button becomes dog.)
    var topic = $(this).attr("data-topic");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ba6zqaYk7V3NBpJPJXcg5yTDeEf7V0bQ&q=" + topic + "&limit=" + limit + "&offset=" + offset;
    
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
          var heartBtn = $('<button type="submit">');
          var gifId = res.data[i].id;
          var gifTitle = res.data[i].title;
          heartBtn.attr("data-id", gifId);
          heartBtn.attr("data-title", gifTitle);
          heartBtn.addClass("btn btn-dark heart-button");
          heartBtn.text("♥");

          cardDiv.append(heartBtn);


          $(".gif-container").prepend(cardDiv);


        }
      });

  }
  

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


function renderFavoriteButton(list) {
    $(".favorite-topics-group").empty(); // empties out the html

    // render our todos to the page
    for (var i = 0; i < list.length; i++) {
      var favTopicBtnDiv = $('<div class="btn-group button-container">');
      var favTopicButton = $('<button type="submit">' + list[i] + '</button>');
      favTopicButton.addClass("btn btn-success favorite-topic");
      favTopicButton.attr("data-topics", list[i]);

      // Create a button with unique identifiers based on what number it is in the list. Again use jQuery to do this.
      // Give your button a data attribute called data-to-do and a class called "checkbox".
      // Lastly add a checkmark inside.

      var favTopicClose = $("<button>");

      favTopicClose.attr("data-remove-favorite", i);
      favTopicClose.addClass("btn btn-success checkbox");
      favTopicClose.text("x");

      // Append the button to the to do div
      favTopicBtnDiv.append(favTopicButton);
      favTopicBtnDiv.append(favTopicClose);


      // Add the button container to the favorite-topics-group div
      $(".favorite-topics-group").append(favTopicBtnDiv);
    }
  }

  function renderFavoriteGifButton(favoriteGifTitle) {
    $(".favorite-gifs-group").empty();

    for (var i = 0; i < favoriteGifTitle.length; i++) {

      // make favorite-gif button
      var favGifBtnDiv = $('<div class="btn-group button-container">');
      favGifBtnDiv.attr("role", "group");
      var favGifButton = $('<button type="submit">' + favoriteGifTitle[i] + '</button>');
      favGifButton.addClass("btn btn-danger favorite-gif");
      favGifButton.attr("data-id", favoriteGifId[i]);

      // make remove button
      var favGifClose = $('<button>');
      favGifClose.attr("data-remove-favorite", i);
      favGifClose.addClass("btn btn-danger checkbox-gif");
      favGifClose.text("x");

      // Append the button to the button container
      // favGifButton.append(favGifClose);
      favGifBtnDiv.append(favGifButton);
      favGifBtnDiv.append(favGifClose);

      // Append the button-container to the favorite-gifs-group div
      $(".favorite-gifs-group").append(favGifBtnDiv)
    }
  }


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


// INSTEAD OF GIVING THE HEART BUTTONS ATTRIBUTE WITH NUMBER AS VALUE, GIVE THE BUTTONS ATTRIBUTE THAT IS AN ID OF THE GIF