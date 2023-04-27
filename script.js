//write quiz on a page 
var quizContainer=document.querySelector(".quiz-container");
var questionContainer = document.querySelector(".question");
var resultsContainer = document.getElementById ("results");
var finalScore=document.getElementById("score");
var startBtn = document.getElementById("start");
var nextBtn = document.getElementById('nextBtn')

var choices = document.querySelectorAll(".choice");
var choicesContainer = document.querySelector (".container");
var timeEl = document.getElementById("seconds-left");
var startPage=document.querySelector(".title-page");


var message = document.getElementById("message")
var grade=0;
var secondsLeft =75;
var inputInitials=document.getElementById("initials");
var submitBtn = document.getElementById('submit');
var final = document.querySelector(".high-scores");
var displayScores = document.getElementById('scores');
var goBackBtn = document.getElementById('go-back');
var clearBtn = document.getElementById('clear-scores');
//var i=0;
var initials=inputInitials.value;
var viewHighScore=document.querySelector(".view-high-score");
var storedInf = {} ;


// array for question and answers
var myQuestions =[ 
     {question: 'Commonly used data types DO Not include:',
     choice: ['strings','booleans', 'alerts', 'numbers'],
     answer: 'alerts'},

     {question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
     choice: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
     answer: 'console.log' },

     {question: 'String values must be enclosed within _____  when being assigned to variables.',
      choice: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
       answer: 'quotes'},

     {question: 'Arrays in Java Script can be used to store ___ ',
      choice: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
      answer: 'all of the above'}  
]

//quiz start page
function startQuizPage(){
  quizContainer.setAttribute('style','display:none');
  message.setAttribute('style','display:none');
  resultsContainer.setAttribute('style','display:none');
  final.setAttribute('style', 'display: none');
}

//display questions on the page
function displayQuestions(i){
  
  if ( i<  myQuestions.length) {
    event.preventDefault();
    var picked = myQuestions[i];
    questionContainer.textContent = picked.question;
    console.log(questionContainer.textContent);
    choices.forEach (function(element, index){
      
      element.textContent = picked.choice[index];
      console.log(picked.choice[index]);
      element.addEventListener('click', function(){
          event.preventDefault();
        var element = event.target;
        element.dataset.state = 'checked';
        
        //checking if chosen is correct answer
        if( element.innerHTML == picked.answer ){
        message.textContent='correct!';
        grade=grade+1;
        console.log("correct! +1" , grade);
          
        } else {
        message.textContent = "oh no!";
        grade=grade;
        secondsLeft-=10;
         
         
        console.log("lost! grade is same" , grade)
        return;

        }
     
      
     
        //localStorage.setItem("quiz", grade);
         //console.log('garde ', grade);
        //element.dataset.state = 'uncheck';
      })



    });
    
  }else{
    return;
  }
    
}


//quiz start

startQuizPage();
//actual start
startBtn.addEventListener('click',function(){
  final.setAttribute('style', 'display: none');
  startPage.setAttribute('style','display:none');
  timer();
  console.log('start');
  quizContainer.setAttribute('style','display: block')
  message.setAttribute('style','display:block');
  var i=0;
  displayQuestions(i);
  i++;
  nextBtn.addEventListener("click", function(){
    if (i< myQuestions.length){
      clean();
      
      displayQuestions(i);
      //i++;
      console.log(i);
      i++;
    } else  if (i===myQuestions.length){
      secondsLeft=0;
      console.log('secondsLeft=0')
     sendMessage();
    }


  });
});

 
submitBtn.addEventListener("click" , finalPage);
goBackBtn.addEventListener('click', function(){
 location.reload();
});
 
  

 





// function for timer
function timer(){
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent =secondsLeft;

    if(secondsLeft<= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
}

function sendMessage(){
  timeEl.textContent="time is up!"
  resultsContainer.setAttribute('style', 'display: block');
  quizContainer.setAttribute('style','display:none');
  message.setAttribute('style','display:none');
  finalScore.textContent = grade;
}

//results
function clean(){
  questionContainer.textContent=" ";
    choices.forEach (function(element, index){
    element.textContent=" ";
    element.dataset.state='uncheck';
   })
}

function toMemory(event){
    
  event.preventDefault();
  var initials=inputInitials.value;
   storedInf.name = initials;
   storedInf.grade=grade;
  console.log( initials);
  
  localStorage.setItem(initials, JSON.stringify(storedInf));
  console.log(initials, JSON.stringify(storedInf));
}

function finalPage(event){
 event.preventDefault();
 var initials=inputInitials.value;
  final.setAttribute('style', 'display: block');
  results.setAttribute('style','display:none');
  toMemory(event);
  var scoring=JSON.parse(localStorage.getItem(initials));
  displayScores.textContent = scoring.name +' - ' + scoring.grade;
  console.log("scoring ", scoring);
  //console.log(localStorage.getItem(initials));
}

clearBtn.addEventListener('click', function (){
  displayScores.textContent =" ";
})

viewHighScore.addEventListener("click", function(){
  final.setAttribute('style', 'display: block');
  secondsLeft = 0;
  message.setAttribute('style','display:none');
  quizContainer.setAttribute('style','display:none');
  resultsContainer.setAttribute('style','display:none');
  startPage.setAttribute('style','display:none');
})