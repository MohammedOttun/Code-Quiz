// DOM reference variables
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var answerChoicesEL = document.getElementById("answer-choices");
var startButtom = document.getElementById("start");
var submitButton = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var quizStartEl = document.getElementById("quiz-start");
var feedbackEl = document.getElementById("feedback");

// sound assets
var rightSound = new Audio("./assets/audio/right.wav");
var wrongSound = new Audio("./assets/audio/wrong.wav");

// time tracking
var time = questions.length * 15;
var timerId;

// question tracking
var currentQuestionIndex = 0;

function startQuiz() {

    console.log("Quiz Started ...");
    // hide start message
    quizStartEl.setAttribute("class", "hide");

    // show question container
    questionsEl.removeAttribute("class");

    // start timer
    timerId = setInterval(clockTicker, 1000);


    timerEl.textContent = time;

    // load question
    getQuestions();
}

// get questions from questions.js
function getQuestions() {
    var currentQuestion = questions[currentQuestionIndex];

    var questionEl = document.getElementById("question-text");
    questionEl.textContent = currentQuestion.question;

    answerChoicesEL.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, i) {
        // button for each answer choice
        var answerChoice = document.createElement("button");
        answerChoice.setAttribute("class", "answer-choices");
        answerChoice.setAttribute("value", choice);

        answerChoice.textContent = i + 1 + ". " + choice;

        // event listener for choice selection.
        answerChoice.onclick = questionClick;

        // display answer choices
        answerChoicesEL.appendChild(answerChoice);
    });

    console.log("Question to be displayed is captured");
}

function questionClick() {
    // check for wrong guess
    if (this.value !== questions[currentQuestionIndex].answer) {
        // 10-second penalty
        time -= 10;

        if (time < 0) {
            time = 0;
        }

        timerEl.textContent = time;

        // play "wrong" sound effect
        wrongSound.play();

        feedbackEl.textContent = "Wrong!";
    } else {
        // play "right" sound effect
        rightSound.play();

        feedbackEl.textContent = "Correct!";
    }

    // flash feedback on page 
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // move to next question
    currentQuestionIndex++;

    // check if we've run out of questions
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestions();
    }
}

//  end quiz
function quizEnd() {
    // stop timer
    clearInterval(timerId);

    // show end screen
    var quizEndEl = document.getElementById("quiz-end");
    quizEndEl.removeAttribute("class");

    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    // hide questions section
    questionsEl.setAttribute("class", "hide");

    console.log("Quiz ended.");
}

// clock ticker
function clockTicker() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    // get user initials in from input box
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];

        // format new score object for current user
        var newScore = {
            score: time,
            initials: initials
        };

        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // redirect to next page
        window.location.href = "highscores.html";
    }
}

// Quiz event listeners
startButtom.onclick = startQuiz;
submitButton.onclick = saveHighscore;
