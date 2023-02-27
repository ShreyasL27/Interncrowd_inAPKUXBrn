const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerBtns = document.getElementById('answer-buttons');
const submitBtn = document.getElementById('submit-button');
const nextBtn = document.getElementById('next-button');

let currentQuestion = 0;
let score = 0;

// Define quiz questions and answers
const quiz = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'Berlin', 'Rome', 'Madrid'],
    answer: 'Paris'
  },
  {
    question: 'What is the largest country in the world?',
    options: ['China', 'Russia', 'USA', 'India'],
    answer: 'Russia'
  },
  {
    question: 'What is the currency of Japan?',
    options: ['Dollar', 'Euro', 'Yen', 'Pound'],
    answer: 'Yen'
  }
];

// Start quiz on page load
window.onload = function() {
  loadQuestion();
}

// Load question and answer options
function loadQuestion() {
  resetState();
  showQuestion(quiz[currentQuestion]);
}

// Show question and answer options
function showQuestion(question) {
  questionEl.innerText = question.question;
  question.options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('btn');
    if (option === question.answer) {
      button.dataset.correct = true;
    }
    button.addEventListener('click', selectAnswer);
    answerBtns.appendChild(button);
});
}

// Reset question and answer options state
function resetState() {
nextBtn.classList.add('hide');
while (answerBtns.firstChild) {
answerBtns.removeChild(answerBtns.firstChild);
}
}

// Select answer and update score
function selectAnswer(e) {
const selectedBtn = e.target;
const correct = selectedBtn.dataset.correct;
if (correct) {
score++;
}
Array.from(answerBtns.children).forEach(button => {
setStatusClass(button, button.dataset.correct);
});
submitBtn.disabled = true;
nextBtn.classList.remove('hide');
}

// Set status class based on correct/incorrect answer
function setStatusClass(element, correct) {
clearStatusClass(element);
if (correct) {
element.classList.add('correct');
} else {
element.classList.add('incorrect');
}
}

// Clear status class
function clearStatusClass(element) {
element.classList.remove('correct');
element.classList.remove('incorrect');
}

// Show next question or results
function showNextQuestion() {
currentQuestion++;
if (currentQuestion < quiz.length) {
loadQuestion();
} else {
showResults();
}
}

// Show quiz results
function showResults() {
resetState();
questionEl.innerText = `You scored ${score}/${quiz.length}`;
submitBtn.disabled = true;
nextBtn.classList.add('hide');
}

// Event listeners
submitBtn.addEventListener('click', () => {
submitBtn.disabled = true;
selectAnswer();
});

nextBtn.addEventListener('click', () => {
showNextQuestion();
});
