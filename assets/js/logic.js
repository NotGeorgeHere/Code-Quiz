/* PsuedoCode 
    When start quiz is pressed, so event listener on it, hide everything in id start screen using class hide
    remove class hide for questions id so that then shows on screen
    create a timer for 1 minute
*/

//Create quiz variable globally as will be used in multiple functions
var quiz = document.querySelector("#questions");


//Timer value, declared outside of function as will need to be used in other areas outside of function so needs to be manipulated I THINK
var timeLeft = 60; 

startQuiz();

//Function to start quiz
function startQuiz(){
    var startScreen = document.querySelector("#start-screen");
    var button = document.querySelector("#start");
    //Checks to see if button is pressed
    button.addEventListener("click", function(event){
        //hides the starting text and removes the hidden class off the quiz attribute
        startScreen.setAttribute("class", "hide");
        quiz.setAttribute("class", "");
        timer();
        questions("Question 1", "1", "2", "3", "4", "2");
    })
}

function timer(){
    var timer = document.querySelector("#time");
    var timeInterval = setInterval(function (){
        timeLeft--;
        timer.textContent = timeLeft
        
        if (timeLeft === 0){
            clearInterval(timeInterval);
          }
    }, 1000)      
}
