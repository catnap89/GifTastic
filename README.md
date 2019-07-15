# GifTastic

## Overview

**GifTastic** is a web application that takes in user request and displays gifs user requested. When user input topic keyword in the search box and click submit button, a topic button will be created. Topic buttons can be created as many as user want. User can click on the topic button to request gifs related to the topic.
There are also two different kind of **Favorites** to store favorite topics or specific gifs user wants.


## How To Use the App

### When the website is loaded for the first time
  * A search box, and following buttons are displayed.
    * Submit
    * Add As Favorite
    * More Gifs

### To start, user need to input text inside searchbox and click **submit** button or **add as favorite** button.
  * When user click **submit** button,
    * A button with value of the texts user inputted in the search box is created under **Your Topic Buttons:**
    * The topic button, on click, will **display 10 gifs** related to the topic.
    * The topic button will be removed when the browser is closed or refreshed.
  * When user clicks **Add as Favorite** button,
    * A button with value of the texts user inputted in the search box is created under **Your Favorite Gif Topics:**
    * The Favorite Gif Topics button, on click, will **display 10 gifs** related to the topic.
    * While **Favorite Gif Topics** button and **Topic** button does same thing on click, the difference is that **Favorite Gif Topics** buttons will persist even after the browser is closed or refreshed.

### After gifs are displayed by clicking topic button or favorite Gif Topic buttons
  * Click **More Gifs** button to request 10 more gifs related to the topic.
    * User can click **More Gifs** button however many times they want.
  
  * click **Heart Button** at the bottom of the card that contains a gif and it's metadata to save that specific gif as a favorite-gif.
    * When the Heart button is clicked, a button will be created under **Your Favorite Gifs:** with value of the texts of the title of the gif that was clicked on.

## When Favorite Gifs button is clicked
  * The app will display the gif that the user saved as their favorite gif.

## GIFS Displayed
  * The gifs is **not animated** when they are being displayed.
  * **Click** on the gif to **toggle between animated and non-animated gifs.**

## Favorite Buttons
  * Both Favorite Gif Topics buttuon and Favorite Gifs Button will have x button on the right side of them.
  * Clicking x button will remove the favorite button.
  * User can always make them favorite again.

  
