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

function beginTimer() {
  timerInterval = setInterval(function () {
    remainingTime--;
    timerElement.textContent = remainingTime + " seconds";

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
    score++;
    showOutcome("You are correct! 😊");
  } else {
    showOutcome("You are incorrect 😞");
    remainingTime -= 3;
  }

  nextButton.disabled = false;
}

function showOutcome(message) {
  var outcome = document.createElement("div");
  outcome.textContent = message;
  choicesElement.appendChild(outcome);
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
  document.body.innerHTML = "";
  var result = document.createElement("h3");
  result.textContent = "Your Final Result";
  document.body.appendChild(result);
}
