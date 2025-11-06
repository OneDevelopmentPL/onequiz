// Pobierz quiz z parametru URL
const urlParams = new URLSearchParams(window.location.search);
const quizName = urlParams.get('quiz') || 'programowanie';
const quizData = quizzes[quizName];

document.getElementById("quiz-category").textContent = `Kategoria: ${quizName}`;
document.getElementById("quiz-title").textContent = "OneQuiz";

let index = 0;
let score = 0;

function loadQuestion() {
  if (!quizData || quizData.length === 0) {
    document.getElementById("quiz-box").innerHTML = `<p>Brak quizu o nazwie "${quizName}".</p>`;
    return;
  }

  const q = quizData[index];
  document.getElementById("question").textContent = q.q;
  const answers = document.getElementById("answers");
  answers.innerHTML = "";
  q.a.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => selectAnswer(i);
    answers.appendChild(btn);
  });
}

function selectAnswer(i) {
  const q = quizData[index];
  if (i === q.correct) score++;
  index++;
  if (index < quizData.length) loadQuestion();
  else showResult();
}

function showResult() {
  document.getElementById("quiz-box").innerHTML = `
    <h2>Twój wynik: ${score}/${quizData.length}</h2>
    <button onclick="restartQuiz()">Zagraj ponownie</button>
  `;
}

function restartQuiz() {
  index = 0;
  score = 0;
  loadQuestion();
}

document.getElementById("next-btn").style.display = "none";
loadQuestion();
