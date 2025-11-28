// admin.js - Panel administracyjny

class AdminPanel {
    constructor() {
        this.quizManager = window.quizManager;
        this.currentEditingQuiz = null;
        this.init();
    }

    init() {
        this.renderQuizzesList();
        this.updateStats();
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Przycisk dodawania quizu
        document.getElementById('addQuizBtn').addEventListener('click', () => {
            this.openModal();
        });

        // Zamknięcie modalu
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeModal();
        });

        // Zapisanie quizu
        document.getElementById('saveQuizBtn').addEventListener('click', () => {
            this.saveQuiz();
        });

        // Dodawanie pytania
        document.getElementById('addQuestionBtn').addEventListener('click', () => {
            this.addQuestion();
        });

        // Zamknięcie modalu po kliknięciu poza nim
        document.getElementById('quizModal').addEventListener('click', (e) => {
            if (e.target.id === 'quizModal') {
                this.closeModal();
            }
        });
    }

    renderQuizzesList() {
        const quizzes = this.quizManager.getAllQuizzes();
        const list = document.getElementById('adminQuizzesList');

        if (Object.keys(quizzes).length === 0) {
            list.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Brak quizów. Dodaj pierwszy quiz!</p>';
            return;
        }

        list.innerHTML = Object.values(quizzes).map(quiz => `
            <div class="admin-quiz-item">
                <div class="admin-quiz-info">
                    <div class="admin-quiz-emoji">${quiz.emoji}</div>
                    <div class="admin-quiz-details">
                        <h3>${quiz.title}</h3>
                        <div class="admin-quiz-meta">
                            ${quiz.category} • ${quiz.questions.length} pytań • ID: ${quiz.id}
                        </div>
                    </div>
                </div>
                <div class="admin-quiz-actions">
                    <button class="btn-icon btn-edit" onclick="adminPanel.editQuiz('${quiz.id}')">
                        ✏️ Edytuj
                    </button>
                    <button class="btn-icon btn-delete" onclick="adminPanel.deleteQuiz('${quiz.id}')">
                        🗑️ Usuń
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateStats() {
        const quizzes = this.quizManager.getAllQuizzes();
        document.getElementById('adminTotalQuizzes').textContent = Object.keys(quizzes).length;
        document.getElementById('adminTotalQuestions').textContent = this.quizManager.getTotalQuestions();
    }

    openModal(quiz = null) {
        const modal = document.getElementById('quizModal');
        const modalTitle = document.getElementById('modalTitle');
        
        this.currentEditingQuiz = quiz;

        if (quiz) {
            modalTitle.textContent = 'Edytuj quiz';
            document.getElementById('quizId').value = quiz.id;
            document.getElementById('quizId').disabled = true;
            document.getElementById('quizTitle').value = quiz.title;
            document.getElementById('quizCategory').value = quiz.category;
            document.getElementById('quizEmoji').value = quiz.emoji;
            
            // Załaduj pytania
            document.getElementById('questionsList').innerHTML = '';
            quiz.questions.forEach((q, index) => {
                this.addQuestion(q, index);
            });
        } else {
            modalTitle.textContent = 'Dodaj nowy quiz';
            document.getElementById('quizId').disabled = false;
            this.resetForm();
        }

        modal.classList.add('active');
    }

    closeModal() {
        const modal = document.getElementById('quizModal');
        modal.classList.remove('active');
        this.currentEditingQuiz = null;
        this.resetForm();
    }

    resetForm() {
        document.getElementById('quizId').value = '';
        document.getElementById('quizTitle').value = '';
        document.getElementById('quizCategory').value = '';
        document.getElementById('quizEmoji').value = '';
        document.getElementById('questionsList').innerHTML = '';
    }

    addQuestion(questionData = null, index = null) {
        const questionsList = document.getElementById('questionsList');
        const questionIndex = index !== null ? index : questionsList.children.length;
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        questionDiv.innerHTML = `
            <div class="question-header">
                <span class="question-number">Pytanie ${questionIndex + 1}</span>
                <button type="button" class="btn-remove" onclick="this.parentElement.parentElement.remove()">
                    ❌ Usuń
                </button>
            </div>
            <div class="form-group">
                <label>Treść pytania</label>
                <input type="text" class="form-input question-text" 
                       value="${questionData?.question || ''}" 
                       placeholder="Wpisz treść pytania" required>
            </div>
            <div class="form-group">
                <label>Odpowiedzi (zaznacz poprawną)</label>
                ${[0, 1, 2, 3].map(i => `
                    <div class="answer-group">
                        <input type="text" class="form-input answer-input" 
                               value="${questionData?.answers[i] || ''}" 
                               placeholder="Odpowiedź ${i + 1}" required>
                        <label class="radio-label">
                            <input type="radio" name="correct-${questionIndex}" 
                                   value="${i}" 
                                   ${questionData?.correct === i ? 'checked' : ''}>
                            <span>Poprawna</span>
                        </label>
                    </div>
                `).join('')}
            </div>
        `;
        
        questionsList.appendChild(questionDiv);
    }

    saveQuiz() {
        // Pobierz dane z formularza
        const quizId = document.getElementById('quizId').value.trim();
        const quizTitle = document.getElementById('quizTitle').value.trim();
        const quizCategory = document.getElementById('quizCategory').value.trim();
        const quizEmoji = document.getElementById('quizEmoji').value.trim();

        // Walidacja podstawowych pól
        if (!quizId || !quizTitle || !quizCategory) {
            alert('Wypełnij wszystkie wymagane pola!');
            return;
        }

        // Walidacja ID (tylko małe litery, cyfry, myślniki)
        if (!/^[a-z0-9-]+$/.test(quizId)) {
            alert('ID quizu może zawierać tylko małe litery, cyfry i myślniki!');
            return;
        }

        // Sprawdź czy ID już istnieje (tylko przy dodawaniu nowego)
        if (!this.currentEditingQuiz) {
            const existingQuiz = this.quizManager.getQuiz(quizId);
            if (existingQuiz) {
                alert('Quiz o takim ID już istnieje!');
                return;
            }
        }

        // Pobierz pytania
        const questions = [];
        const questionItems = document.querySelectorAll('.question-item');
        
        if (questionItems.length === 0) {
            alert('Dodaj przynajmniej jedno pytanie!');
            return;
        }

        questionItems.forEach((item, index) => {
            const questionText = item.querySelector('.question-text').value.trim();
            const answers = Array.from(item.querySelectorAll('.answer-input'))
                .map(input => input.value.trim());
            const correctRadio = item.querySelector(`input[name="correct-${index}"]:checked`);

            if (!questionText || answers.some(a => !a) || !correctRadio) {
                alert(`Wypełnij wszystkie pola w pytaniu ${index + 1}!`);
                return;
            }

            questions.push({
                question: questionText,
                answers: answers,
                correct: parseInt(correctRadio.value)
            });
        });

        if (questions.length === 0) {
            return;
        }

        // Utwórz obiekt quizu
        const quiz = {
            id: quizId,
            title: quizTitle,
            category: quizCategory,
            emoji: quizEmoji || '📝',
            questions: questions
        };

        // Zapisz quiz
        if (this.currentEditingQuiz) {
            this.quizManager.updateQuiz(quizId, quiz);
        } else {
            this.quizManager.addQuiz(quiz);
        }

        // Odśwież listę i zamknij modal
        this.renderQuizzesList();
        this.updateStats();
        this.closeModal();

        alert('Quiz został zapisany pomyślnie!');
    }

    editQuiz(quizId) {
        const quiz = this.quizManager.getQuiz(quizId);
        if (quiz) {
            this.openModal(quiz);
        }
    }

    deleteQuiz(quizId) {
        const quiz = this.quizManager.getQuiz(quizId);
        if (confirm(`Czy na pewno chcesz usunąć quiz "${quiz.title}"?`)) {
            this.quizManager.deleteQuiz(quizId);
            this.renderQuizzesList();
            this.updateStats();
            alert('Quiz został usunięty!');
        }
    }
}

// Inicjalizacja
let adminPanel;
document.addEventListener('DOMContentLoaded', () => {
    adminPanel = new AdminPanel();
});
