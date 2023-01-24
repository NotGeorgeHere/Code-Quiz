//Timer value, declared outside of function as will need to be used in other areas outside of function so needs to be manipulated I THINK
var timeLeft = 60;
var score = 0;

//Global variable to track which quiz question you're on;
var questionTracker = 0;

//Does a check to see which HTML page is currently being presented
if(document.URL.includes("highscores.html")){
    //When highscores page is clicked on array is rendered
    renderArray();
    //Checks to see if clear highscores button is pressed, if it is then clearas local storage and re-renders the array. 
    var clearScore = document.querySelector("#clear");
    clearScore.addEventListener("click", function(event){
        localStorage.clear();
        renderArray();    
})
}
else{
    startQuiz();
}

//Function to start quiz
function startQuiz(){
    var quiz = document.querySelector("#questions");
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
        //If time left is 0 and questiontracker is on final question it will hide elements and show the end screen
        if (timeLeft === 0 && questionTracker !== 5){
            timer.remove();
            clearInterval(timeInterval);
            var choices = document.querySelector("#questions");
            var endScreen = document.querySelector("#end-screen");
            var finalScore = document.querySelector("#final-score");
            var submitButton = document.querySelector("#submit")

            //Unhides endscreen and hides the question choices
            endScreen.setAttribute("class", "");
            choices.setAttribute("class", "hide");
            //Sets the text to the score amount
            finalScore.textContent = score;
            //Will run the saveHighScore function when submit button is pressed
            submitButton.addEventListener("click", function(event){
                //Checks to make sure people only put in initials
                if (initials.value.length <= 3){
                    //Runs the savehighscore function with finalscore as an argument
                    saveHighScore(score);
                }
            })
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
    //Switch case?
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
    var timer = document.querySelector("#time");
    timer.remove();
    timeLeft = 1;
    //If submitbutton is pressed on end screen, the initials typed in will be pushed to an initials array and both these arrays will be stored.
    submitButton.addEventListener("click", function(event){
        //Checks to make sure people only put in initials
        if (initials.value.length <= 3){
            //Runs the savehighscore function with finalscore as an argument
            saveHighScore(finalScore);
        }
    })   
    }
}

//Function for rendering array
function renderArray(){
    //Gets the list element and creates a new variable using the highscore stored in local storage
    var highScoreList = document.querySelector("#highscores");
    var newScore = JSON.parse(window.localStorage.getItem("highscores"));
    //If it isnt empty, run a for loop and append each item inside the newscore object to a list element
    if (newScore !== null){
        for (var i = 0; i < newScore.length; i++){
            var li = document.createElement("li");
            li.textContent = JSON.stringify("Score: " + newScore[i].Score + " " + newScore[i].Initial);
            highScoreList.appendChild(li);
        }
    }
    else{
        //Hides the list if there are no elements ie: local storage is cleared
        highScoreList.setAttribute("class", "hide");
    }
   
}

//Saves highscore and runs when submit button is pressed
function saveHighScore(score){
    //Gets the initial from the query selector
    var initials = document.querySelector("#initials").value.trim();
    //If the initials aren't blank either get the items from the current local storage object or create a new array for it
    if (initials !== ''){
        var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
        //Creates new item to be pushed into highscores object
        var newScore = {
            "Score": score,
            "Initial": initials
        }
        highscores.push(newScore);
        //Sets the object to highscores in local storage and goes to highscore screen
        window.localStorage.setItem('highscores', JSON.stringify(highscores));
        window.location.href = "highscores.html"; 
    }
    
}