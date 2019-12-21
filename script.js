var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  ///etc.
];


// replace the score in the modal by looking up the local storage
function replaceScore() {
  let modalTitleElem = document.querySelector("#exampleModalLongTitle");
  let highScore = localStorage.getItem("highScore");
  if (highScore){
    modalTitleElem.textContent = modalTitleElem.textContent.replace("None",highScore);
  }
}

// add back the modal start button
function addModalStartButton(){
  let b = $("<button>");
  b.attr("type", "button");
  b.attr("class", "btn btn-primary centerItem");
  b.attr("data-toggle", "modal");
  b.attr("data-target", "#exampleModalCenter");
  b.attr("id", "modalStartButton");
  b.text("Start Quiz");
  $("#primaryDiv").append(b);
}

// when you start the quiz
$("#startQuiz").on("click", function(){
  $("#modalStartButton").remove();
  // run quiz function
  runQuiz();
})

function runQuiz(){
  // put the question in the div
  // start the timer
  // when user clicks the answer, store time remaining and whether they got it correct

}

function startTimer(){
  var myVar = setInterval(function myTimer() {
    remainingTime = document.getElementById("timeRemaining").innerHTML;
    if (remainingTime > 0){
      remainingTime -=1;
    }
  }
  , 1000);
}

function clearTimer(){
  
}


replaceScore();