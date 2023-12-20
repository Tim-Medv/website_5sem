// Флаг для отслеживания выполнения анимации
var isRunning = false;

// Обработчик клика по контейнеру
document.querySelector('.svg-container').addEventListener('click', function() {
    // Если анимация уже выполняется, выходим
    if (isRunning) return;

    isRunning = true;

    // Получаем нужные элементы
    var svgContainer = this;
    var smileImage = svgContainer.querySelector('.hidden-image');
    var helloText = svgContainer.querySelector('.hello-text');
    var svgElement = svgContainer.querySelector('svg');
    var redDot = svgContainer.querySelector('.red-dot');

    // Прячем SVG и точку
    svgElement.style.display = 'none';
    redDot.style.display = 'none';

    // Показываем изображение с улыбкой
    smileImage.style.display = 'block';
    
    // После задержки меняем изображение на текст
    setTimeout(function() {
        smileImage.style.display = 'none';
        helloText.style.display = 'block';

        // Добавляем эффект тряски
        setTimeout(function() {
            svgContainer.classList.add('shake');
        }, 2000);

        // Возвращаем все в исходное состояние
        setTimeout(function() {
            svgContainer.classList.remove('shake');
            svgElement.style.display = 'block';
            redDot.style.display = 'block';
            helloText.style.display = 'none';

            isRunning = false;
        }, 3000);

    }, 2000);
});//!!
