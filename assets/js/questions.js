/*
Create a function that takes in arguments for questions, appends them onto the page and also returns the correct answer
if whatever is clicked === correct answer score +1 blah blah blah
*/

function questions(question, optionOne, optionTwo, optionThree, optionFour, answer){

    //Gets the id for the question-title and stores it as variable
    var questionTitle = document.querySelector("#question-title");

    //Puts all of the options into 1 array that can be accessed
    var options = [optionOne, optionTwo, optionThree, optionFour];

    //Adds the question to the h2 element in html
    questionTitle.textContent = question;

    //Loop through the array and adds an button with the contents answer in it and a class of choices
    for (var i = 0; i < options.length; i++){

    }
}