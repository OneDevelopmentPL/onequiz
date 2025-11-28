// quiz.js - Logika rozwiązywania quizu

class QuizApp {
    constructor() {
        this.quizManager = window.quizManager;
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.quizData = null;
        this.quizId = null;
        this.init();
    }

    init() {
        const urlParams = new URLSearchParams(window.location.search);
        this.quizId = urlParams.get('quiz');
        
        if (this.quizId) {
            this.quizData = this.quizManager.getQuiz(this.quizId);
            
            if (this.quizData) {
                this.render();
            } else {
                this.showError(`Quiz "${this.quizId}" nie został znaleziony.`);
            }
        } else {
            this.showError('Nie podano ID quizu. Użyj parametru ?quiz=ID');
        }
    }

    render() {
        const app = document.getElementById('quizApp');
        
        if (this.currentQuestion < this.quizData.questions.length) {
            app.innerHTML = this.renderQuestion();
            this.attachEventListeners();
        } else {
            app.innerHTML = this.renderResults();
            this.attachRestartListener();
            this.saveCompletion();
        }
    }

    renderQuestion() {
        const question = this.quizData.questions[this.currentQuestion];
        const progress = ((this.currentQuestion / this.quizData.questions.length) * 100).toFixed(0);
        
        return `
            <div class="quiz-title">${this.quizData.emoji} ${this.quizData.title}</div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="question-container">
                <div class="question-number">Pytanie ${this.currentQuestion + 1} z ${this.quizData.questions.length}</div>
                <div class="question">${question.question}</div>
                <div class="answers">
                    ${question.answers.map((answer, index) => 
                        `<button class="answer-btn" data-index="${index}">${answer}</button>`
                    ).join('')}
                </div>
            </div>
            <button class="next-btn" disabled>Następne pytanie →</button>
        `;
    }

    renderResults() {
        const percentage = ((this.score / this.quizData.questions.length) * 100).toFixed(0);
        let message = '';
        
        if (percentage === 100) {
            message = '🏆 Perfekcyjnie! Jesteś mistrzem!';
        } else if (percentage >= 80) {
            message = '🌟 Świetna robota!';
        } else if (percentage >= 60) {
            message = '👍 Dobry wynik!';
        } else if (percentage >= 40) {
            message = '📚 Niezły start, możesz lepiej!';
        } else {
            message = '💪 Spróbuj jeszcze raz!';
        }

        return `
            <div class="results">
                <h2>Koniec quizu!</h2>
                <div class="score">${this.score} / ${this.quizData.questions.length}</div>
                <div class="score-message">${message}</div>
                <div style="color: #666; margin-bottom: 30px; font-size: 1.2em;">
                    Twój wynik: ${percentage}%
                </div>
                <button class="restart-btn">🔄 Spróbuj ponownie</button>
                <button class="restart-btn" onclick="window.location.href='index.html'" 
                        style="background: #6c757d; margin-top: 1rem;">
                    🏠 Powrót do strony głównej
                </button>
            </div>
        `;
    }

    showError(message) {
        const app = document.getElementById('quizApp');
        app.innerHTML = `
            <div class="error">
                <h2>❌ Błąd</h2>
                <p>${message}</p>
                <button class="restart-btn" onclick="window.location.href='index.html'" 
                        style="margin-top: 2rem;">
                    ← Powrót do strony głównej
                </button>
            </div>
        `;
    }

    attachEventListeners() {
        const answerButtons = document.querySelectorAll('.answer-btn');
        const nextButton = document.querySelector('.next-btn');

        answerButtons.forEach(btn => {
            btn.addEventListener('click', () => this.selectAnswer(btn));
        });

        nextButton.addEventListener('click', () => this.nextQuestion());
    }

    selectAnswer(button) {
        const answerIndex = parseInt(button.dataset.index);
        const question = this.quizData.questions[this.currentQuestion];
        const answerButtons = document.querySelectorAll('.answer-btn');
        const nextButton = document.querySelector('.next-btn');

        // Zablokuj wszystkie przyciski
        answerButtons.forEach(btn => {
            btn.classList.remove('selected', 'correct', 'incorrect');
            btn.disabled = true;
        });

        // Zaznacz odpowiedź
        this.selectedAnswer = answerIndex;

        if (answerIndex === question.correct) {
            button.classList.add('correct');
            this.score++;
        } else {
            button.classList.add('incorrect');
            answerButtons[question.correct].classList.add('correct');
        }

        nextButton.disabled = false;
    }

    nextQuestion() {
        this.currentQuestion++;
        this.selectedAnswer = null;
        this.render();
    }

    attachRestartListener() {
        const restartButton = document.querySelector('.restart-btn');
        if (restartButton) {
            restartButton.addEventListener('click', () => {
                this.currentQuestion = 0;
                this.score = 0;
                this.selectedAnswer = null;
                this.render();
            });
        }
    }

    saveCompletion() {
        this.quizManager.saveQuizCompletion(
            this.quizId,
            this.score,
            this.quizData.questions.length
        );
    }
}

// Uruchom aplikację
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
