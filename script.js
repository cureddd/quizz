let questionElement = document.querySelector('.question');
let answerButtons = document.querySelectorAll('.answer');
let result = document.querySelector('.result')
 let container = document.querySelector('.container')
 let button = document.querySelector('.button')
 let timerElement = document.querySelector('.timer');
 let startContainer = document.querySelector('.start-container');

let signs = ["+", "-","*","/"]
function getRandomsign(){
    return signs[randInt(0,3)]
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) { 
    let j = Math.floor(Math.random() * (i + 1));  
    [array[i], array[j]] = [array[j], array[i]] 
  } 
  return array
}
  function randInt(min, max) {
return Math.round(Math.random() * (max - min) + min)
  }

  

class Question{
    constructor(){
        let a = randInt(1,30)
        let b = randInt(1,30)
        let sign = getRandomsign()
        this.question = `${a} ${sign} ${b}`
    
        
        if(sign == "+"){this.correct = a + b}
        else if (sign=='-'){this.correct = a - b}

        else if(sign == "*"){this.correct = a * b}
        else if (sign== "/")(this.correct = Math.round(a  / b))
        this.answers = [randInt(this.correct + 5, this.correct - 5),
        randInt(this.correct + 15, this.correct - 15),
         randInt(this.correct + 10, this.correct - 10),
          randInt(this.correct + 5, this.correct - 5),
          this.correct] 
   shuffle(this.answers)
    }

 display() {
        questionElement.innerHTML = this.question;
        for (let i = 0; i < this.answers.length; i++) {
            answerButtons[i].innerHTML = this.answers[i];
        }
    }
}
    
let counter = 0
let current_question = new Question
let correct_counter = 0
let timerInterval;

current_question.display()


function startTimer() {
    let timeLeft = 10; 
    timerElement.textContent = timeLeft;
    clearInterval(timerInterval); 
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            
            let accuracy = counter > 0 ? Math.round(correct_counter * 100 / counter) : 0;
            result.innerHTML = `[Ви відповіли правильно ${correct_counter} з ${counter} питань, Точність - ${accuracy}%]`;
            container.style.display = "none";
            button.style.display = "block";
            result.style.display = "flex";
            startContainer.style.display = "flex";
            button.textContent = "Спробувати ще раз!";
        }
    }, 1000);
}
 


for (let i = 0; i < answerButtons.length; i+= 1) {
    answerButtons[i].addEventListener("click", () => {

        if (answerButtons[i].innerHTML == +current_question.correct) {
          
            answerButtons[i].style.background = '#00FF00'
                anime({
                targets: answerButtons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'})
                correct_counter++

        } else {
        answerButtons[i].style.background = '#ff0000'
                anime({
                targets: answerButtons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'})
                
        }
counter++
   current_question = new Question
   current_question.display()
    
    })
    
}


button.addEventListener("click", () => {
    if (button.textContent === "Спробувати ще раз!") {
        button.textContent = "Начать"; 
    }
    container.style.display = "flex";
    button.style.display = "none";
    result.style.display = "none";
    startContainer.style.display = "none";
    correct_counter = 0;
    counter = 0;
    startTimer();
    setTimeout(() => {
      clearInterval(timerInterval);
        let accuracy = counter > 0 ? Math.round(correct_counter * 100 / counter) : 0;
        result.innerHTML = `[Ви відповіли правильно ${correct_counter} з ${counter} питань, Точність - ${accuracy}%]`;
        container.style.display = "none";
        button.style.display = "block";
        result.style.display = "flex";
        
        button.textContent = "Спробувати ще раз!"; 
    }, 10000);
});
