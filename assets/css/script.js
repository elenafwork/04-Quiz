var quizContainer = document.getElementById("question");
var resultsContainer = document.getElementById ("results");
var startBtn = document.getElementById("start");
var choices = document.querySelectorAll(".choice");
var choicesContainer = document.querySelector (".container");
var timeEl = document.querySelector("#seconds-left");

 //choices.forEach((btn) => {
 // btn.addEventListener("click", (event)=>{
 //   choices.forEach(())
 // })
 //})



var message = document.getElementById("message")
var grade=0;
var secondsLeft =120;
// array for question and answer
var myQuestions =[ 
     {question: 'Commonly used data types DO Not include:',
     choice: ['strings','booleans', 'alerts', 'numbers'],
     answer: 'alerts'},

     {question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
     choice: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
     answer: 'console.log' },

     {question: 'String values must be enclosed within _____  when being assigned to variables.',
      choice: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
       answer: 'quotes'}

]
 var picked;
function pickQuestion(){
  for (i=0; i<myQuestions.length; i++){
    picked=myQuestions[i];
  }
  return picked;
}

//console.log(picked.question);
function currentQuestion(){
    pickQuestion();
    console.log(picked);//
   quizContainer.textContent=picked.question;
   choices.forEach(function(element,index){
    element.textContent = picked.choice[index];
    element.addEventListener("click", function(){
      //element.textContent="a";
       if(picked.answer == picked.choice[index] ){
         message.textContent='correct!';
         grade=grade+1;

       } else {
        message.textContent = "oh no!";
       }
       localStorage.setItem("quiz", grade);
       resultsContainer.textContent ="your result: " + grade+" out of 4";
       
    });
     
   });
   
}
startBtn.addEventListener("click", timer);
currentQuestion();

 function timer(){
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent ="Time: " + secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
 }
 function sendMessage(){
  timeEl.textContent="time is up!"
 }