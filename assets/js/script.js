
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');

const questionContainerEl = document.getElementById('question-contaienr');
const questionEl = document.getElementById('question');
const answerButtonEl = document.getElementById('answer-button');

var timeVisEl = documnet.querySelector(".timervisible");
var countdown = document.getElementById("#timerText");


let shuffleQuestions,currentQuestionIndex;
let quizScore = 0;

const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers :[
            { text: '<script>', correct: true},
            { text: '<javascript>', correct: false},
            { text: '<span>', correct: false},
            { text: '<js>', correct: false},
        ]
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        answers :[
            { text: 'The <body> section', correct: false},
            { text: 'Both the <head> and the <body> section', correct: true},
            { text: 'The <head> section', correct: false},
            { text: 'The <div> section', correct: false},
        ]
    },
    {
        question: 'How do you write "Hello World" into an alert box?',
        answers :[
            { text: 'msgBox("Hellow World")', correct: false},
            { text: 'msg("Hellow World")', correct: false},
            { text: 'alert("Hellow World")', correct: true},
            { text: 'alertBox("Hellow World")', correct: false},
        ]
    },
    {
        question: 'Which event occurs when the user clicks on the HTML element?',
        answers :[
            { text: 'onclick', correct: true},
            { text: 'onmouseclick', correct: false},
            { text: 'onmouseover', correct: false},
            { text: 'onchange', correct: false},
        ]
    },
    {
        question: 'How do you write an IF statement in JavaScript?',
        answers :[
            { text: 'if I == 5 then', correct: false},
            { text: 'if (I == 5)', correct: true},
            { text: 'if I = 5 then', correct: false},
            { text: 'if I = 5 ', correct: false},
        ]
    }
];

function setTime () {
    var timeLeft = 3000;
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timeVisEl.textContent = timeLeft + ' seconda remaining';
            timeLeft--;
        } else if (timeLeft === 1) {
            timeVisEl.textContent = timeLeft + 'seconds remaining';
            timeLeft--;
        } else {
            timeVisEl.textContent = '';
            clearInterval(timeInterval);
            displayMessage();
        }
    }, 3000);
}

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () =>{
    currentQuestionIndex++
    setNextQuestion()
});

function startGame() {
    startButton.classList.add('hide')
    shuffleQuestions = questions.sort(() => Math.random() -0.5 )
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide')
    setNextQuestion()
    quizScore = 0;
};

function setNextQuestion () {
    restState();
    showQuestion(shuffleQuestions[currentQuestionIndex])
};

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.foreach((answer) => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('add')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click, selectAnswer')
        answerButtonEl.appendChild(button)
    })
};

function restState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    }
};

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    setStatusClass(document.body,correct)
    Array.from(answerButtonEl.children).forEach((button)=>{
        setStatusClass(button,button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex +1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "restart"
        startButton.classList.remove("hide")
    }
    if (selectedButton.dataset = correct) {
        quizScore++ 
    }
    document.getElementById('right-answer').innerHTML = quizScore
};

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct){
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
};


function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
};
