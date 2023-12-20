const questions = [
    {
        question: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        answers: ["Пол деревни, за раз", "Полдеревни, зараз", "Пол-деревни, за раз"],
        correct: 1,
        explanation: "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом."
    },
    {
        question: "А эти слова как пишутся?",
        answers: ["Капуччино и эспрессо", "Каппуччино и экспресо", "Капучино и эспрессо"],
        correct: 2,
        explanation: "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо»."
    },
    {
        question: "Как нужно писать?",
        answers: ["Черезчур", "Черес-чур"],
        correct: 0,
        explanation: "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур»."
    },
    {
        question: "Где допущена ошибка?",
        answers: ["Аккордеон", "Белиберда", "Эпелепсия"],
        correct: 2,
        explanation: "Верно! Это слово пишется так: «эпИлепсия»."
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Функция для перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// Функция displayQuestion отвечает за отображение вопроса и ответов на странице.
function displayQuestion() {
    // Получаем текущий объект вопроса из массива вопросов, используя текущий индекс вопроса.
    const question = questions[currentQuestionIndex];

    // Находим элемент с идентификатором 'question' и устанавливаем его текстовое содержимое 
    // равным тексту вопроса из объекта текущего вопроса.
    document.getElementById('question').textContent = question.question;

    // Находим элемент списка с идентификатором 'answers' для дальнейшего добавления вариантов ответов.
    const answersUl = document.getElementById('answers');
    // Очищаем предыдущие ответы, устанавливая внутреннее HTML-содержимое элемента списка в пустую строку.
    answersUl.innerHTML = '';

    // Получаем текст правильного ответа для текущего вопроса.
    const correctAnswer = question.answers[question.correct];
    // Перемешиваем копию массива возможных ответов для добавления случайности порядка их отображения.
    const shuffledAnswers = shuffleArray([...question.answers]);
    
    // Определение функции обратного вызова, которая будет использоваться для определения индекса правильного ответа.
    function isCorrectAnswer(answer) {
    // Сравниваем текущий элемент массива с правильным ответом
        return answer === correctAnswer;
  }
  // Вызываем метод findIndex на перемешанном массиве ответов с нашей функцией обратного вызова.
    const newCorrectIndex = shuffledAnswers.findIndex(isCorrectAnswer);

  
    // Для каждого ответа в перемешанном массиве создаем элемент списка <li>.
    shuffledAnswers.map((answer, index) => {
        const li = document.createElement('li'); // Создание нового элемента списка.
        li.textContent = answer; // Установка текста элемента равным тексту ответа.
        // Добавление обработчика события клика, который вызовет функцию handleAnswer при клике на ответ.
        li.addEventListener('click', () => handleAnswer(index, newCorrectIndex));
        return li; // Возвращаем элемент для последующего добавления в список на странице.
    }).forEach(li => answersUl.appendChild(li)); // Добавляем каждый элемент списка в родительский элемент <ul>.

    // Очищаем текстовое содержимое элемента с идентификатором 'explanation', который используется для отображения пояснения к ответу.
    document.getElementById('explanation').textContent = '';
}


// Функция handleAnswer вызывается, когда пользователь кликает по одному из ответов.
function handleAnswer(selectedIndex, correctIndex) {
    // Получаем объект текущего вопроса из массива вопросов.
    const question = questions[currentQuestionIndex]; // const question = questions[0];

    // Получаем все элементы списка ответов на странице.
    const answersLi = document.querySelectorAll('#answers li'); // NodeList[<li>, <li>, <li>]

    // Проходим по каждому элементу списка
    answersLi.forEach((li, index) => {
        // Удаляем обработчик события клика, чтобы предотвратить повторное голосование.
        li.removeEventListener('click', handleAnswer); // li.onclick = null
        // Добавляем класс 'disabled', чтобы визуально отображать, что ответы больше не активны.
        li.classList.add('disabled'); // li.className += ' disabled'

        // Проверяем, не является ли текущий элемент списка правильным ответом.
        if (index !== correctIndex) {
            // Если это не правильный ответ, добавляем класс 'fade-out' для анимации исчезновения.
            li.classList.add('fade-out'); // li.className += ' fade-out'
        } else {
            // Если это правильный ответ, устанавливаем таймер для подсветки его через 3 секунды.
            setTimeout(() => {
                // Добавляем класс 'correct', чтобы визуально отображать, что это правильный ответ.
                li.classList.add('correct'); // li.className += ' correct'
                // Проверяем, совпадает ли индекс выбранного ответа с индексом правильного ответа.
                if (selectedIndex === correctIndex) {
                    // Если ответ пользователя был правильным, добавляем в элемент списка текст пояснения.
                    li.innerHTML += `<div class='explanation-text'>${question.explanation}</div>`; // li.innerHTML += 'Пояснение...'
                    score++; 
                }
            }, 3000); 
        }
    }); 


    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }, 6000); // Увеличиваем время до следующего вопроса, чтобы показать правильный ответ
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `<p>Опрос завершен! Ваш результат: ${score} из ${questions.length}.</p>`;
}

shuffleArray(questions);
document.addEventListener('DOMContentLoaded', displayQuestion);
