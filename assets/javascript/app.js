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
// 
var topics = [];


