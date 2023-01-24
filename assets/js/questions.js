function questions(question, optionOne, optionTwo, optionThree, optionFour, answer){

    //Gets the id for the question-title and stores it as variable
    var questionTitle = document.querySelector("#question-title");
    var choices = document.querySelector("#choices");
    var feedback = document.querySelector("#feedback");
    //Takes away 1 from the answer argument as its been reading from a base index 0 not 1 as the options are being taken in as
    answer--;

    //Sounds
    var wrong = new Audio("assets/sfx/incorrect.wav");
    var correct = new Audio("assets/sfx/correct.wav");

    //Puts all of the options into 1 array that can be accessed
    var options = [optionOne, optionTwo, optionThree, optionFour];

    //Adds the question to the h2 element in html
    questionTitle.textContent = question;

    //Loop through the array and adds an button with the contents answer in it and a class of choices
    for (var i = 0; i < options.length; i++){
        var index = options.indexOf(options[i]);
        var button = document.createElement("button");
        button.textContent = options[i];

        button.addEventListener("click", function(event){
            //Tracks what is being clicked on within the element
            var option = event.target;
            //If its a button then it will check to see whether the data-answer attribute is true or not, if true score will add by 1
            if(option.matches("button") === true){
                if (option.getAttribute("data-answer") === "true"){
                    score++;
                    feedback.setAttribute("class", "feedback")
                    feedback.textContent = "Correct";
                    correct.play();
                }
                //If answer is wrong, time will -10 and all elements will be removed again to allow for next questions to be presented
                else{
                    timeLeft -= 10;
                    feedback.setAttribute("class", "feedback")
                    feedback.textContent = "Wrong";
                    wrong.play();
                }
                //Once this is done, it will remove the text content of the title and choices to be empty for the next question
                questionTitle.textContent = " ";
                choices.textContent = "";
                //Will add 1 to the tracker to move onto next question
                questionTracker++;
                //Will run question order again to get the next question before appending the elements
                questionOrder();   
            } 
        })
        //Appends the button to the parent element of choices
        choices.appendChild(button);
        button.setAttribute("id", "option")
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