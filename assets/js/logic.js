
//Create quiz variable globally as will be used in multiple functions
var quiz = document.querySelector("#questions");

//Timer value, declared outside of function as will need to be used in other areas outside of function so needs to be manipulated I THINK
var timeLeft = 60;
var score = 0;

//Global variable to track which quiz question you're on;
var questionTracker = 0;

//Global variables to keep track of the array content for the highscore page.
var finalScoreArray = [];
var finalInitialArray = [];

//Does a check to see which HTML page is currently being presented
if (document.URL.includes("index.html")){
    startQuiz();
}
else if(document.URL.includes("highscores.html")){
    init()
}

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
        questionOrder();  
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
            var endScreen = document.querySelector("#end-screen");
            endScreen.setAttribute("class", "");
          }
    }, 1000)      
}

//Function for questions, takes in question, options, and which of the 4 is the answer, ie: this one has option 2 as the answer
function questionOrder(){
    var endScreen = document.querySelector("#end-screen");
    var submitButton = document.querySelector("#submit");
    var initials = document.querySelector("#initials");
    var totalScore = document.querySelector("#final-score");
    
    //Adds the questions according to the tracker variable
    if (questionTracker === 0){
        questions("Question 1: What keyword is used in CSS to prevent other rules from overriding it?", "!important", "!final", "!first", "!key", 1);
    }
    else if (questionTracker === 1){
        questions("Question 2: How many heading tags are in HTML?", "4", "7", "6", "15", 3);
    }
    else if (questionTracker === 2){
        questions("Question 3: Inside which HTML element do we put JavaScript?", "<js>", "<script>", "<javascript>", "<source>", 2);
    }
    else if (questionTracker === 3){
        questions("Question 4: How do you create a function in JavaScript?", "function myFunction()", "function = myFunction()", "function:myfunction()", "define function(myFunction)", 1);
    }
    else if (questionTracker === 4){
        questions("Question 5: How does a for loop start?", "for i=1 to 5", "for(i<=5;i++)", "for(i=0;i<5)", "for (i=0;i<5;i++)", 4);
    }
    //Runs once all questions are asked
    else if(questionTracker === 5){
        storeArrays();    
}

function storeArrays(){
    //Sets score to 0 if they didnt get any answers right and pushes this to global finalScoreArray
    if (score === 0){
        finalScore = 0;
        totalScore.textContent = "0";
    }
    //If not 0 it will get the final score by adding score and time left and pushing this to array
    else{
        var finalScore = timeLeft + score;
        totalScore.textContent = finalScore;
        
    }
    //This displays the endscreen and takes away the hide class and sets the timer to 1 so it no longer counts down
    endScreen.setAttribute("class", "");
    timeLeft = 1;

    //If submitbutton is pressed on end screen, the initials typed in will be pushed to an initials array and both these arrays will be stored.
    submitButton.addEventListener("click", function(event){
        //Checks to make sure people only put in initials
        if (initials.value.length <= 3){
            finalInitialArray.push(initials.value);
            finalScoreArray.push(finalScore); 
        }

        localStorage.setItem("initials", JSON.stringify(finalInitialArray));
        localStorage.setItem("finalScore", JSON.stringify(finalScoreArray));
    })   
    }
}

function init(){
    //Get stored arrays from local storage
    var storedInitial = JSON.parse(localStorage.getItem("initials"));
    var storedFinalScore = JSON.parse(localStorage.getItem("finalScore"));

    // If initals and score were retrieved from localStorage, update the arrays for them
    if (storedInitial !== null && storedFinalScore !== null){
        finalInitialArray = storedInitial;
        finalScoreArray = storedFinalScore;
    }
    renderArray();
}

function renderArray(){
    var highScoreList = document.querySelector("#highscores");
    for (var i = 0; i < finalScoreArray.length; i++){
        var li = document.createElement("li");
        li.textContent = finalInitialArray[i] + " Score: " + finalScoreArray[i];
        highScoreList.appendChild(li);
    }
}