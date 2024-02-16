document.getElementById("start").addEventListener("click", startQuiz);
const timeElement = document.getElementById("time");
const questionsElement = document.getElementById("questions");
const questionTitleElement = document.getElementById("question-title");
const choicesElement = document.getElementById("choices");
const endScreenElement = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const initialsElement = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const startScreenElement = document.getElementById("start-screen");
const feedbackElement = document.getElementById("feedback");

let currentQuestionIndex, totalSeconds, timer;

function startQuiz() {
   currentQuestionIndex = 0;
   totalSeconds = 75; // Set total seconds for the quiz
   timeElement.textContent = totalSeconds;
   startScreenElement.classList.add("hide");
   questionsElement.classList.remove("hide");
   timer = setInterval(updateTime, 1000);
   showQuestion();
}

function updateTime() {
   totalSeconds--;
   timeElement.textContent = totalSeconds;
   if (totalSeconds <= 0) {
      endQuiz();
   }
}

function showQuestion() {
   const currentQuestion = questions[currentQuestionIndex];
   questionTitleElement.textContent = currentQuestion.question;
   choicesElement.innerHTML = ""; // Clear previous choices
   currentQuestion.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.textContent = `${index + 1}. ${choice}`;
      button.addEventListener("click", selectAnswer);
      choicesElement.appendChild(button);
   });
}

function selectAnswer(e) {
   const selectedChoice = e.target.textContent;
   const correctAnswer = questions[currentQuestionIndex].answer;

   if (selectedChoice.substring(3) === correctAnswer) {
      feedbackElement.textContent = "Correct!";
   } else {
      feedbackElement.textContent = "Wrong!";
      totalSeconds -= 10; // Penalize time for wrong answer
   }
   feedbackElement.classList.remove("hide");
   setTimeout(() => {
      feedbackElement.classList.add("hide");
   }, 1000);

   currentQuestionIndex++;
   if (currentQuestionIndex === questions.length) {
      endQuiz();
   } else {
      showQuestion();
   }
}

function endQuiz() {
   clearInterval(timer);
   questionsElement.classList.add("hide");
   endScreenElement.classList.remove("hide");
   finalScoreElement.textContent = totalSeconds;
}

submitButton.addEventListener("click", (e) => {
   e.preventDefault(); // Prevent default form submission behavior
   const initials = initialsElement.value;
   if (initials) {
      const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
      const newScore = {
         score: totalSeconds,
         initials: initials,
      };
      highscores.push(newScore);
      localStorage.setItem("highscores", JSON.stringify(highscores));
      window.location.href = "highscores.html"; // Redirect to highscores page
   }
});
