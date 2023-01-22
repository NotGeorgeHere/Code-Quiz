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
    questionAnswered();
    /*
    Potential layout for this function if everything works correctly
    questions("Question 1", "option 1", "option 2", "option 3", "option 4", 2);
    questionAnswered();
    questions();
    questionAnswered()
    */
}


//Function to work out what happens when the question is answered
function questionAnswered(){
    //Local variables for each element needed
    var choice = document.querySelector("#choices");
    var button = document.querySelectorAll("#option");
    var questionTitle = document.querySelector("#question-title");
    
    //Event listener for when anything inside the choices element is clicked
    choice.addEventListener("click", function(event){
        //Tracks what is being clicked on within the element
        var option = event.target;
        
        //If its a button then it will check to see whether the data-answer attribute is true or not, if true score will add by 1
        if(option.matches("button") === true){
            if (option.getAttribute("data-answer") === "true"){
                score++
                //Once answered will loop through the buttons and remove them alongside the title
                for(var i = 0; i < button.length; i++){
                    button[i].remove();
                }
                questionTitle.remove();
            }
            //If answer is wrong, time will -5 and all elements will be removed again to allow for next questions to be presented
            else{
                timeLeft -= 5;
                for(var i = 0; i < button.length; i++){
                    button[i].remove();
                }
                questionTitle.remove();
            }
        }  
    })
}