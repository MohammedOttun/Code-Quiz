// DOM reference variables
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var answerChoicesEL = document.getElementById("answer-choices");
var startButtom = document.getElementById("start");
var submitButton = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var quizStartEl = document.getElementById("quiz-start");
var quizEndEl = document.getElementById("quiz-end")

// sound assets
var rightSound = new Audio("../assets/audio/right.wav");
var wrongSound = new Audio("../assets/audio/wrong.wav");

// time tracking
var time = questions.length * 15;

// question tracking
var currentQuestionIndex = 0;

function startQuiz() {

    console.log("Quiz Started ...");
    // hide start message
    quizStartEl.setAttribute("class", "hide");

    // show question container
    questionsEl.removeAttribute("class");

    // start timer
    var timerId = setInterval(clockTicker, 1000);

    timerEl.textContent = time;

    // load question
    getQuestions();
};

// get questions from questions.js
function getQuestions() {
    var currentQuestion = questions[currentQuestionIndex];

    var questionEl = document.getElementById("question-text");
    questionEl.textContent = currentQuestion.question;

    answerChoicesEL.innerHTML = "";

    console.log("Question to be displayed is captured");
};

// clock ticker
function clockTicker() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEndEl();
    }
}

//  end quiz
function quizEndEl() {

    console.log("Quiz ended.");
};

// Quiz event listeners
startButtom.onclick = startQuiz;
