// quizData.js
// Format: window.quizzes['nazwa'] = { title, questions }

window.quizzes = {
    'historia': {
        title: 'Quiz z Historii Polski',
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
            },
            {
                question: 'Kto był autorem Konstytucji 3 Maja?',
                answers: ['Hugo Kołłątaj i Stanisław Małachowski', 'Jan Zamoyski', 'Stefan Batory', 'Zygmunt August'],
                correct: 0
            },
            {
                question: 'W którym roku upadła dynastia Piastów?',
                answers: ['1370', '1385', '1410', '1399'],
                correct: 0
            }
        ]
    },
    
    'geografia': {
        title: 'Quiz z Geografii Świata',
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
                question: 'Na którym kontynencie leży Egipt?',
                answers: ['Afryka', 'Azja', 'Europa', 'Obie A i B'],
                correct: 0
            },
            {
                question: 'Jak nazywa się najwyższy szczyt świata?',
                answers: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
                correct: 0
            },
            {
                question: 'Ile oceanów znajduje się na Ziemi?',
                answers: ['5', '4', '6', '3'],
                correct: 0
            }
        ]
    },
    
    'nauka': {
        title: 'Quiz Naukowy',
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
            },
            {
                question: 'Jaka jest prędkość światła w próżni?',
                answers: ['300 000 km/s', '150 000 km/s', '500 000 km/s', '200 000 km/s'],
                correct: 0
            },
            {
                question: 'Co to jest DNA?',
                answers: ['Kwas deoksyrybonukleinowy', 'Kwas rybonukleinowy', 'Białko', 'Węglowodan'],
                correct: 0
            }
        ]
    },
    
    'sport': {
        title: 'Quiz Sportowy',
        questions: [
            {
                question: 'W którym roku odbyły się pierwsze nowożytne Igrzyska Olimpijskie?',
                answers: ['1896', '1900', '1888', '1904'],
                correct: 0
            },
            {
                question: 'Ile zawodników gra w drużynie piłkarskiej na boisku?',
                answers: ['11', '10', '12', '9'],
                correct: 0
            },
            {
                question: 'Kto jest najlepszym strzelcem w historii Mistrzostw Świata w piłce nożnej?',
                answers: ['Miroslav Klose', 'Ronaldo', 'Gerd Müller', 'Pelé'],
                correct: 0
            },
            {
                question: 'Jak nazywa się główny turniej tenisowy rozgrywany w Londynie?',
                answers: ['Wimbledon', 'US Open', 'French Open', 'Australian Open'],
                correct: 0
            },
            {
                question: 'Ile punktów jest warte trafienie kosza za linią 3 punktów w koszykówce?',
                answers: ['3', '2', '4', '5'],
                correct: 0
            }
        ]
    },
    
    'filmy': {
        title: 'Quiz Filmowy',
        questions: [
            {
                question: 'Kto wyreżyserował film "Incepcja"?',
                answers: ['Christopher Nolan', 'Steven Spielberg', 'Quentin Tarantino', 'Martin Scorsese'],
                correct: 0
            },
            {
                question: 'Który film zdobył najwięcej Oscarów w historii?',
                answers: ['"Titanic", "Ben-Hur" i "Władca Pierścieni: Powrót króla" (po 11)', '"Ojciec chrzestny"', '"Avatар"', '"Casablanca"'],
                correct: 0
            },
            {
                question: 'Jak nazywa się pierwszy film Disneya?',
                answers: ['Królewna Śnieżka i siedmiu krasnoludków', 'Pinokio', 'Fantazja', 'Bambi'],
                correct: 0
            },
            {
                question: 'Kto zagrał główną rolę w filmie "Matrix"?',
                answers: ['Keanu Reeves', 'Brad Pitt', 'Tom Cruise', 'Leonardo DiCaprio'],
                correct: 0
            },
            {
                question: 'W którym roku premierę miał pierwszy film o Jamesie Bondzie?',
                answers: ['1962', '1965', '1960', '1958'],
                correct: 0
            }
        ]
    }
};

// Możesz dodawać kolejne quizy w tym samym formacie:
// window.quizzes['nazwa-quizu'] = { title: '...', questions: [...] };
