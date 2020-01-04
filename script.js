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

var myTimer;
var userName;
var quizScore;
var remainingTime = parseInt(document.getElementById("timeRemaining").innerHTML,10);
var currentQuesNum = 0;


// replace the score in the modal by looking up the local storage
function replaceHighScore() {
  let modalTitleElem = document.querySelector("#startQuizModalModalTitle");
  let highscores = $("#highscores");
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
  $("#timeRemaining").text = "Time: "+ questions.length;

  // run quiz function
  runQuiz();
})

function runQuiz(){
  // start the timer
  // when user clicks the answer, if they got it correct, show next question, 
  //   if they get it wrong, subtract 5s and keep on page
  startTimer();
  
  // build the quiz skeleton
  let qb = $("#questionBox");
  
  // title div
  let t = $("<div>");
  t.attr("id","questionTitle");
  qb.append(t);
  
  // question div
  let c = $("<div>");
  c.attr("id","choices");
  qb.append(c);
  
  // answers div (form)
  let a = $("<div>");
  a.attr("id","answer");
  qb.append(a);
  
  // submit button
  let s = $("<button>");
  s.attr("class","btn btn-primary submit");
  s.attr("id","submitAnswer");
  s.on("click",checkAnswer);
  qb.append(s);

  runQuestion(currentQuesNum);
  
}

function runQuestion(questionNum){
  // put the question in the div
  let ques = questions[questionNum];
  let t = $("#questionTitle");
  let c = $("#choices");
  c.empty();
  let s = $("#submitAnswer");

  t.text(ques.title);
  setChoices(c,ques.choices);
  ques.answer
  
  // if selected_item.text == q.answer
    // if last question, wrap up quiz
    // display "correct"
    // change button's text to next question and onClick to run this func again with questionNum+1


  // add onclick to 
}

function setChoices(mainElemJ,choices){
  // add radio buttons to choices div
    for (choice of choices){
    curElem = $("<input>");
    curElem.attr("type","radio");
    curElem.attr("name","choice");
    curElem.attr("class","choice");
    curElem.text(choice);
    mainElemJ.append(curElem);
    mainElemJ.append("<br>");
  }
}

function checkAnswer(){
  currentQuestion = questions[currentQuesNum];
  a = currentQuestion.answer;
  let checkedElem = $(".choice:checked")[0];
  if (checkedElem.text === a){

  }
  else{
    if (remainingTime > 4){
      remainingTime -= 5;
    }
    else{
      remainingTime = 0;
    }
  }
}

function wrapUpQuiz(){
  // update currentScore, if timer is 0, display button to restart, else go to name enter screen
  // once name is entered, append score:name to high score object, then store the score
  
  quizScore = remainingTime;
  // stop the timer
  clearTimer();

  if (quizScore){
    // add enter name field
    // onClick store score
  }
  else{
    // display "times up!"
  }
  // add button to reset
}


function storeScore(){
  scores = localStorage.getItem("scores");
  // if we have scores already
  if (scores){
    // if we already have 10 scores
    scores = JSON.parse(scores);
    // high scores
    // Object.keys(scores).sort();
    scores[quizScore] = userName;
    if (scores.length > 10){
      lowestScore = Object.keys(scores).sort()[0];
      delete scores[lowestScore];
    }
    localStorage.setItem("scores",JSON.stringify(scores));
  }
  else
    localStorage.setItem("scores",JSON.stringify({quizScore:userName}));
}

function getScores(){
  scores = localStorage.getItem("scores");
  // if we have scores already
  if (scores){
    // if we already have 10 scores
    scores = JSON.parse(scores);
  }
  else
    scores = {};
  return scores;
}

function updateHighScores(){
  let hs = $("#highScores");
  scores = getScores();
  // for each append score in h1
}

function startTimer(){
  myTimer = setInterval(function myTimer() {
    if (remainingTime > 0){
      remainingTime -=1;
    }
    else{
      wrapUpQuiz();
    }
  }
  , 1000);
}

function clearTimer(){
  clearTimeout(myTimer);
}


replaceHighScore();