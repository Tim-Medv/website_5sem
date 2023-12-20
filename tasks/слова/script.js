// Слушаем событие загрузки контента DOM, чтобы убедиться, что скрипт не выполняется до полной загрузки элементов страницы
document.addEventListener("DOMContentLoaded", function() {

    const staticList = document.querySelector(".staticWordList");
    const dynamicList = document.querySelector(".dynamicWordList");
    const outputArea = document.querySelector(".outputArea");

    // Функция для обновления содержимого в outputArea с текстом элементов из dynamicList
    function updateOutput() {

        const items = dynamicList.querySelectorAll("li");

        const itemTexts = Array.from(items).map(item => item.textContent.replace(/a\d+\s|n\d+\s/, ''));

        outputArea.textContent = itemTexts.join(' ');
    }


    // ПЕРЕТАСКИВАНИЕ ЭЛЕМЕНТА
    function handleDragOver(event) {

        event.preventDefault();

        const draggable = document.querySelector('.dragging');

        const afterElement = getDragAfterElement(event.currentTarget, event.clientY);

        if (afterElement == null) {
            event.currentTarget.appendChild(draggable);
        } else {
            event.currentTarget.insertBefore(draggable, afterElement);
        }
    }

    // Навешиваем обработчики событий на staticList и dynamicList для перетаскивания
    [staticList, dynamicList].forEach(list => {
        list.addEventListener('dragover', handleDragOver);

        list.addEventListener("drop", event => {
            // Если элемент брошен в dynamicList, обновляем outputArea
            if (event.currentTarget === dynamicList) {
                updateOutput();
            }
        });
    });

    // Обработчик клика на кнопку "Разобрать"
    document.querySelector(".parseButton").addEventListener("click", createListItems);
});


// Функция для создания элементов списка с перетаскиваемыми элементами.
function createListItems() {

    let inputText = document.querySelector(".inputField").value;
    let words = inputText.split('-').map(word => word.trim()); 
    let sortedWords = words.sort((a, b) => isNaN(a) ? -1 : isNaN(b) ? 1 : a - b);


    let list = document.querySelector(".staticWordList");
    list.innerHTML = '';


    sortedWords.forEach((word, index) => {
        let listItem = document.createElement("li");

        listItem.textContent = `${isNaN(word) ? `a${index + 1}` : `n${index + 1}`} ${word}`;

        listItem.draggable = true;

        listItem.addEventListener("dragstart", () => listItem.classList.add("dragging"));
        listItem.addEventListener("dragend", () => listItem.classList.remove("dragging"));

        list.appendChild(listItem);
    });
}


function getDragAfterElement(list, y) {

    const draggableElements = [...list.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect(); 
        const offset = y - box.top - box.height / 2; 

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element; 
}
