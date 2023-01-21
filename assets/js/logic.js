/* PsuedoCode 
    When start quiz is pressed, so event listener on it, hide everything in id start screen using class hide
    remove class hide for questions id so that then shows on screen
    create a timer for 1 minute
*/

//Create quiz variable globally as will be used in multiple functions
var quiz = document.querySelector("#questions");


//Timer value, declared outside of function as will need to be used in other areas outside of function so needs to be manipulated I THINK
var timeLeft = 60;
var score = 0; 

startQuiz();

//Function to start quiz
function startQuiz(){
    var startScreen = document.querySelector("#start-screen");
    var button = document.querySelector("#start");
    //Checks to see if button is pressed
    button.addEventListener("click", function(event){
        //hides the starting text and removes the hidden class off the quiz attribute and runs the timer when button is pressed
        startScreen.setAttribute("class", "hide");
        quiz.setAttribute("class", "");
        timer();
        questionOrder()   
    })
}

//Function for timer element, counts down from 60 seconds using timeleft global variable
function timer(){
    var timer = document.querySelector("#time");
    var timeInterval = setInterval(function (){
        timeLeft--;
        timer.textContent = timeLeft
        
        //TODO add go to end screen
        if (timeLeft === 0){
            clearInterval(timeInterval);
          }
    }, 1000)      
}

//Function for questions, takes in question, options, and which of the 4 is the answer, ie: this one has option 2 as the answer
function questionOrder(){
    questions("Question 1", "option 1", "option 2", "option 3", "option 4", 2);
    /*
    Potential layout for this function if everything works correctly
    questions("Question 1", "option 1", "option 2", "option 3", "option 4", 2);
    questionAnswered();
    questions();
    questionAnswered()
    */
}

function questionAnswered(){
    var options = document.querySelector("#option");
}