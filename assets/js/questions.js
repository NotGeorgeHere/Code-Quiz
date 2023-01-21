/*
Create a function that takes in arguments for questions, appends them onto the page and also returns the correct answer
if whatever is clicked === correct answer score +1 blah blah blah
*/

function questions(question, optionOne, optionTwo, optionThree, optionFour, answer){

    //Gets the id for the question-title and stores it as variable
    var questionTitle = document.querySelector("#question-title");
    var choices = document.querySelector("#choices");

    //Takes away 1 from the answer argument as its been reading from a base index 0 not 1 as the options are being taken in as
    answer--;

    //Puts all of the options into 1 array that can be accessed
    var options = [optionOne, optionTwo, optionThree, optionFour];

    //Adds the question to the h2 element in html
    questionTitle.textContent = question;

    //Loop through the array and adds an button with the contents answer in it and a class of choices
    for (var i = 0; i < options.length; i++){
        var index = options.indexOf(options[i]);
        var button = document.createElement("button");
        button.textContent = options[i];
        //Appends the button to the parent element of choices
        choices.appendChild(button);

        //Add a boolean value to each button based off of answer
        //If the index of the array is the same as the answer argument, answer = true else its false, can now keep track of the right answer
        if (index == answer){
            button.setAttribute("data-answer", true);    
        }
        else{
            button.setAttribute("data-answer", false);
        }
    }
}