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
var remainingTime;
var timeElement = document.querySelector("#timeRemaining")
var currentQuesNum;
var numQuestions = questions.length;
var response;


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
  b.attr("data-target", "#startQuizModal");
  b.attr("id", "modalStartButton");
  b.text("Start Quiz");
  $("#primaryDiv").append(b);
}

// when you start the quiz
$("#startQuiz").on("click", function(){
  $("#modalStartButton").remove();
  //$("#timeRemaining").text = remainingTime;

  // run quiz function
  runQuiz();
})

$("#nameEntry").on("click", function(){
  userName = $("#username").val();
  storeScore();
  updateHighScores();
})

function runQuiz(){
  // start the timer
  // when user clicks the answer, if they got it correct, show next question, 
  //   if they get it wrong, subtract 5s and keep on page
  currentQuesNum = 0;
  remainingTime = questions.length*15;
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
  
  // submit button
  let s = $("<button>");
  s.attr("class","btn btn-primary submit");
  s.attr("id","submitAnswer");
  s.text("submit")
  s.on("click",checkAnswer);
  qb.append(s);

  let r = $("<div>");
  r.attr("id","response");
  qb.append(r);
  response = $("#response");

  runQuestion();
  
}

function runQuestion(){
  // put the question in the div
  // if question number is oob, wrap up quiz
  response.css("opacity","0");
  response.text("incorrect :( time was subtracted")
  if (currentQuesNum >= numQuestions){
    currentQuesNum = 0;
    wrapUpQuiz();
  }
  let ques = questions[currentQuesNum];
  let t = $("#questionTitle");
  let c = $("#choices");
  c.empty();
  let s = $("#submitAnswer");

  t.text(ques.title);
  setChoices(c,ques.choices);
  
  
  // change button's text to next question and onClick to run this func again with questionNum+1
}

function setChoices(mainElemJ,choices){
  // add radio buttons to choices div
  // note jQuery will auto close the tag, so make a string and append it instead for input since we dont want to auto close it
    for (choice of choices){
      curElem = '<input type="radio" name="choice" class="choice" value="'+choice+'">'+choice
      //curElem = $("<input>");
      //curElem.attr("type","radio");
      //curElem.attr("name","choice");
      //curElem.attr("class","choice");
      //curElem.text(choice);
      mainElemJ.append(curElem);
      mainElemJ.append("<br>");
    }
}

function checkAnswer(){
  // if selected_item.text == q.answer
  // display "correct"

  currentQuestion = questions[currentQuesNum];
  a = currentQuestion.answer;
  let checkedElem = $(".choice:checked")[0];
  if (checkedElem){
    if (checkedElem.value === a){
      currentQuesNum += 1;
      runQuestion();
    }
    else{
      if (remainingTime > 4){
        remainingTime -= 5;
      }
      else{
        remainingTime = 0;
      }
      response.animate({opacity:"0"},100);
      response.animate({opacity:"1"},100);
    }
  }
}

function wrapUpQuiz(){
  // update currentScore, if timer is 0, display button to restart, else go to name enter screen
  // once name is entered, append score:name to high score object, then store the score
  
  quizScore = remainingTime;
  // stop the timer
  clearTimer();
  let qb = $("#questionBox");
  qb.empty();
  if (quizScore){
    // add enter name field
    // onClick store score
  }
  else{
    // display "times up!"
  }
  
  // update name entry form with score
  let a = $("#nameEntryModalModalTitle");
  a.text("You Scored: "+quizScore);

  $('#nameEntryScreenModal').modal('show');
  // add button to reset
  addModalStartButton();
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
  // display current score
  let hs = $("#highScores");
  scores = getScores();
  scoreKeys = Object.keys(scores).sort().reverse();
  hs.empty();
  // for each append score in h1
  for (score of scoreKeys){
    s = $("<p>");
    s.text(scores[score]+" : "+score)
    hs.append(s);
  }
}

function startTimer(){
  myTimer = setInterval(function myTimer() {
    if (remainingTime > 0){
      remainingTime -=1;
    }
    else{
      wrapUpQuiz();
    }
    timeElement.innerHTML = remainingTime;
  }
  , 1000);
}

function clearTimer(){
  clearTimeout(myTimer);
}


replaceHighScore();