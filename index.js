// initialising variables
var currentQuestion = 0;
var score = 0;
var remainingTime = 60;
var timerInterval;

// referencing HTML elements
var questionElement = document.getElementById("question");
var timerElement = document.getElementById("timer");
var choicesElement = document.getElementById("choices");
var nextButton = document.getElementById("nextButton");

// using add event listener for Start Quiz button
startButton.addEventListener("click", function () {
  // hides initial welcome box and then will show quiz container
  document.querySelector(".welcomeBox").style.display = "none";
  document.querySelector(".quizBox").style.display = "block";

  beginTimer();
  showQuestion();
});

nextButton.addEventListener("click", showNextQuestion);

// function to kickstart the timer
function beginTimer() {
  timerInterval = setInterval(function () {
    remainingTime--;
    timerElement.textContent = remainingTime + " seconds";

    // results only show if timer hits zero
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      showResults();
    }
  }, 1000);
}

function showQuestion() {
  var question = questions[currentQuestion];
  questionElement.textContent = question.title;

  choicesElement.innerHTML = "";

  for (var i = 0; i < question.choices.length; i++) {
    var choice = question.choices[i];
    var button = document.createElement("button");
    button.textContent = choice;

    button.addEventListener("click", function () {
      checkAnswer(this.textContent);
    });

    choicesElement.appendChild(button);
  }

  nextButton.disabled = true;
}

function checkAnswer(selectedResponse) {
  var question = questions[currentQuestion];

  if (selectedResponse === question.answer) {
    score++; // incrementing the score if correct
    showOutcome("You are correct! 😊");
  } else {
    showOutcome("You are incorrect 😞");
    remainingTime -= 10; //deducting 10 seconds if incorrect answer
  }

  nextButton.disabled = false;
}

function showOutcome(message) {
  var outcome = document.createElement("div");
  outcome.textContent = message;
  choicesElement.appendChild(outcome);

  nextButton.disabled = false;
}

function showNextQuestion() {
  currentQuestion++;

  if (currentQuestion === questions.length) {
    clearInterval(timerInterval);
    showResults();
  } else {
    showQuestion();
  }
}

function showResults() {
  var resultContainer = document.getElementById("resultContainer");
  resultContainer.style.display = "block";

  var scoreElement = document.getElementById("score");
  scoreElement.textContent = "Your score: " + score + "/" + questions.length;

  var leaderboardElement = document.getElementById("leaderboard");
  var leaderboard = getLeaderboard();
  leaderboardElement.textContent = "High Scores: " + leaderboard.join(", ");

  document.body.appendChild(resultContainer);
}
