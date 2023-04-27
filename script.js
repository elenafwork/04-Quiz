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
var secondsLeft =60;
var inputInitials=document.getElementById("initials").value;
var submitBtn = document.getElementById('submit');
var final = document.querySelector(".high-scores");
var displayScores = document.getElementById('scores');
var goBackBtn = document.getElementById('go-back');
var clearBtn = document.getElementById('clear-scores');
var i=0;

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
  
  var picked = myQuestions[i];
  if (i<myQuestions.length) {
    
    questionContainer.textContent = picked.question;
    console.log(questionContainer.textContent);
    choices.forEach (function(element, index){
      choices.push
      element.textContent = picked.choice[index];
      console.log(picked.choice[index]);
      element.addEventListener('click', function(){
        event.preventDefault();
      var element = event.target;
      element.dataset.state = 'checked';
      element.setAttribute('style', 'background-color: pink') 
     
      if(picked.answer == picked.choice[index] ){
       message.textContent='correct!';
       grade=grade+1;
       
        
        } else {
       message.textContent = "oh no!";
       
       secondsLeft-=10;
       return;
    }
      //localStorage.setItem("quiz", grade);
      console.log('garde ', grade);
    //element.dataset.state = 'uncheck';
  })



      });
    
  }
    
}


//quiz start
startQuizPage();
//actual start
startBtn.addEventListener('click',function(){
  final.setAttribute('style', 'display: none');
  document. body.removeChild(startPage);
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
      // i++;
      displayQuestions(i);
      i++;
      console.log(i);
      //element.dataset.state='uncheck';
    } else  if (i===myQuestions.length){
      secondsLeft=0;
      console.log('secondsLeft=0')
     sendMessage();
    }


  });
});

 //toMemory();
submitBtn.addEventListener("click" , finalPage);
goBackBtn.addEventListener('click', function(){
 location.reload();
});
//clearBtn.addEventListener("click", function(){})
//localStorage.setItem(inputInitials, grade);
// console.log(inputInitials); 
  

 





// function for timer
function timer(){
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent =secondsLeft;

    if(secondsLeft === 0) {
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
    element.setAttribute('style', 'background-color: white');
    element.dataset.state='uncheck';
   })
}

function toMemory(event){
    
  //event.preventDefault();
  console.log(inputInitials);
  console.log( typeof inputInitials);
  localStorage.setItem("quiz", grade);
}

function finalPage(){
 event.preventDefault();
  final.setAttribute('style', 'display: block');
  results.setAttribute('style','display:none');
  //displayScores.textContent = 
  //console.log(localStorage.setItem( grade));
}



