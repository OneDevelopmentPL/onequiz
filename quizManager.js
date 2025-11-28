// quizManager.js - System zarządzania quizamiclass QuizManager {
constructor() {
this.storageKey = 'oneQuizData';
this.statsKey = 'oneQuizStats';
this.initializeStorage();
}initializeStorage() {
    // Sprawdź czy dane istnieją w localStorage
    const data = localStorage.getItem(this.storageKey);    if (!data) {
        // Jeśli nie ma danych, załaduj domyślne quizy
        const defaultQuizzes = this.getDefaultQuizzes();
        this.saveQuizzes(defaultQuizzes);
    }    // Inicjalizuj statystyki
    if (!localStorage.getItem(this.statsKey)) {
        const stats = {
            completed: {},
            totalCompleted: 0
        };
        localStorage.setItem(this.statsKey, JSON.stringify(stats));
    }
}getDefaultQuizzes() {
    return {
        'historia': {
            id: 'historia',
            title: 'Quiz z Historii Polski',
            category: 'Historia',
            emoji: '🏛️',
            questions: [
                {
                    question: 'W którym roku Polska odzyskała niepodległość?',
                    answers: ['1918', '1920', '1914', '1916'],
                    correct: 0
                },
                {
                    question: 'Kto był pierwszym królem Polski?',
                    answers: ['Bolesław Chrobry', 'Mieszko I', 'Kazimierz Wielki', 'Władysław Łokietek'],
                    correct: 0
                },
                {
                    question: 'W którym roku odbyła się bitwa pod Grunwaldem?',
                    answers: ['1410', '1420', '1400', '1415'],
                    correct: 0
                }
            ],
            createdAt: new Date().toISOString()
        },
        'geografia': {
            id: 'geografia',
            title: 'Quiz z Geografii Świata',
            category: 'Geografia',
            emoji: '🌍',
            questions: [
                {
                    question: 'Jaka jest stolica Australii?',
                    answers: ['Canberra', 'Sydney', 'Melbourne', 'Perth'],
                    correct: 0
                },
                {
                    question: 'Która rzeka jest najdłuższa na świecie?',
                    answers: ['Nil', 'Amazonka', 'Jangcy', 'Missisipi'],
                    correct: 1
                },
                {
                    question: 'Jak nazywa się najwyższy szczyt świata?',
                    answers: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
                    correct: 0
                }
            ],
            createdAt: new Date().toISOString()
        },
        'nauka': {
            id: 'nauka',
            title: 'Quiz Naukowy',
            category: 'Nauka',
            emoji: '🔬',
            questions: [
                {
                    question: 'Jaki jest symbol chemiczny złota?',
                    answers: ['Au', 'Ag', 'Fe', 'Cu'],
                    correct: 0
                },
                {
                    question: 'Ile planet znajduje się w Układzie Słonecznym?',
                    answers: ['8', '9', '7', '10'],
                    correct: 0
                },
                {
                    question: 'Kto odkrył penicylinę?',
                    answers: ['Alexander Fleming', 'Louis Pasteur', 'Marie Curie', 'Isaac Newton'],
                    correct: 0
                }
            ],
            createdAt: new Date().toISOString()
        }
    };
}getAllQuizzes() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
}getQuiz(quizId) {
    const quizzes = this.getAllQuizzes();
    return quizzes[quizId] || null;
}saveQuizzes(quizzes) {
    localStorage.setItem(this.storageKey, JSON.stringify(quizzes));
}addQuiz(quiz) {
    const quizzes = this.getAllQuizzes();
    quiz.createdAt = new Date().toISOString();
    quizzes[quiz.id] = quiz;
    this.saveQuizzes(quizzes);
    return true;
}updateQuiz(quizId, updatedQuiz) {
    const quizzes = this.getAllQuizzes();
    if (quizzes[quizId]) {
        updatedQuiz.updatedAt = new Date().toISOString();
        quizzes[quizId] = { ...quizzes[quizId], ...updatedQuiz };
        this.saveQuizzes(quizzes);
        return true;
    }
    return false;
}deleteQuiz(quizId) {
    const quizzes = this.getAllQuizzes();
    if (quizzes[quizId]) {
        delete quizzes[quizId];
        this.saveQuizzes(quizzes);
        return true;
    }
    return false;
}getTotalQuestions() {
    const quizzes = this.getAllQuizzes();
    return Object.values(quizzes).reduce((total, quiz) => {
        return total + (quiz.questions ? quiz.questions.length : 0);
    }, 0);
}getStats() {
    const data = localStorage.getItem(this.statsKey);
    return data ? JSON.parse(data) : { completed: {}, totalCompleted: 0 };
}saveQuizCompletion(quizId, score, totalQuestions) {
    const stats = this.getStats();    if (!stats.completed[quizId]) {
        stats.completed[quizId] = {
            count: 0,
            bestScore: 0,
            lastPlayed: null
        };
    }    stats.completed[quizId].count++;
    stats.completed[quizId].bestScore = Math.max(stats.completed[quizId].bestScore, score);
    stats.completed[quizId].lastPlayed = new Date().toISOString();
    stats.totalCompleted++;    localStorage.setItem(this.statsKey, JSON.stringify(stats));
}exportToQuizDataJS() {
    const quizzes = this.getAllQuizzes();
    let jsContent = '// quizData.js\n// Automatycznie wygenerowany przez OneQuiz\n\n';
    jsContent += 'window.quizzes = ' + JSON.stringify(quizzes, null, 4) + ';';    return jsContent;
}downloadQuizDataJS() {
    const content = this.exportToQuizDataJS();
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quizData.js';
    a.click();
    URL.revokeObjectURL(url);
}
}// Stwórz globalną instancję
window.quizManager = new QuizManager();
