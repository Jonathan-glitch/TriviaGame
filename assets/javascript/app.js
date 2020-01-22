document.addEventListener("DOMContentLoaded", function(){
  //setting up all of the var
console.log("You have linked up");
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
// var seconds = (
//   Math.floor((t % (1000 * 30)) / 1000),
//   document.getElementById("second").innerHTML =seconds);

  // if (t < 0) { 
  //   document.getElementById("second").innerHTML = '0'; } 

  
var countDown = 10;
  


let shuffledQuestions, currentQuestionIndex
var correctCounter = parseInt(0)
var wrongCounter = parseInt(0)
//start and next buttons set up to start timer as soon as you lick start and show questions
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  countDown = 10
  currentQuestionIndex++
  $('#second').text(countDown)
  startTimer()
  setNextQuestion()
})
//setting up the timer that forces the user to next question
  var time;
  function startTimer() {
    time = setInterval(function(){
      countDown--
      // console.log("countdown",countDown);
      if (countDown <= 0) {
        alert("Times UP !!!")
        wrongCounter++
        countDown = 10
        currentQuestionIndex++
        if (currentQuestionIndex == shuffledQuestions.length) {
          clearInterval(time)
          startButton.innerText = 'Restart'
          startButton.classList.remove('hide')
        }else{
          setNextQuestion()
        }
      }
      
      $('#second').text(countDown)
        }, 1000);
  }
  //start game funcion
function startGame() {

  startTimer()

  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  console.log(correctCounter,wrongCounter)
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  clearInterval(time)
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    clearInterval(time)
    startButton.classList.remove('hide')

  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    correctCounter++
    console.log('correct counter',correctCounter)
    element.classList.add('correct')
  } else {
    wrongCounter++
    console.log('wrong counter',wrongCounter)
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What type of animal is a seahorse?',
    answers: [
      { text: 'Crustacean', correct: true },
      { text: 'Arachnid', correct: false},
      { text: 'Fish', correct: false },
      { text: 'Shell', correct: false },
    ]
  },
  {
    question: 'Which of the following dogs is the smallest?',
    answers: [
      { text: 'Dachshund', correct: false },
      { text: 'Poodle', correct: false},
      { text: 'Pomeranian', correct: false },
      { text: 'Chihuahua', correct: true },
    ]
  },
  {
    question: 'What color are zebras?',
    answers: [
      { text: 'White with black stripes.', correct: false },
      { text: 'Black with white stripes.', correct: true },
      { text: 'Both of the above.', correct: false },
      { text: 'None of the above.', correct: false },
    ]
  },
  {
    question: 'What existing bird has the largest wingspan?',
    answers: [
      { text: 'Stork', correct: false },
      { text: 'Swan', correct: false },
      { text: 'Condor', correct: false },
      { text: 'Albatross', correct: true },
    ]
  },
  {
    question: 'What is the biggest animal that has ever lived?',
    answers: [
      { text: 'Blue whale', correct: true },
      { text: 'African elephant', correct: false },
      { text: 'Apatosaurus (aka brontosaurus)', correct: false },
      { text: 'Spinosaurus', correct: false },
    ]
  },
  {
    question: 'What pets do more families own?',
    answers: [
      { text: 'Birds', correct: false },
      { text: 'Cats', correct: true },
      { text: 'Dogs', correct: false },
      { text: 'Horses', correct: false },
    ]
  },
  {
    question: 'What animal lives the longest?',
    answers: [
      { text: 'Ocean quahog (clam)', correct: true },
      { text: 'Red sea urchin', correct: false },
      { text: 'Galapagos tortois', correct: false },
      { text: 'Rougheye rockfish', correct: false },
    ]
  },
  {
    question: 'What are female elephants called?',
    answers: [
      { text: 'Mares', correct: false },
      { text: 'Sows', correct: false },
      { text: 'Cows', correct: true },
      { text: 'Dams', correct: false },
    ]
  },
  {
    question: 'Which of the following animals sleep standing up?',
    answers: [
      { text: 'Gorillas', correct: false },
      { text: 'Flamingos', correct: true },
      { text: 'Camels', correct: false },
      { text: 'Ravens', correct: false },
    ]
  },
  {
    question: 'What is the fastest water animal?',
    answers: [
      { text: 'Porpoise', correct: false },
      { text: 'Sailfish', correct: true },
      { text: 'Flying fish', correct: false },
      { text: 'Tuna', correct: false },
    ]
  },
]
});