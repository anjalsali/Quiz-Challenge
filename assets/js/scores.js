const highscoresElement = document.getElementById("highscores");
const clearButton = document.getElementById("clear");

document.addEventListener("DOMContentLoaded", showHighscores);

function showHighscores() {
   const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
   highscores.sort((a, b) => b.score - a.score); // Sort scores in descending order

   highscores.forEach((score) => {
      const li = document.createElement("li");
      li.textContent = `${score.initials}: ${score.score}`;
      highscoresElement.appendChild(li);
   });
}

clearButton.addEventListener("click", () => {
   localStorage.removeItem("highscores");
   highscoresElement.innerHTML = ""; // Clear the displayed scores
});
