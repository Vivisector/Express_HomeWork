// Получаем элемент счетчика
const divCounter = document.querySelector('.counter');
divCounter.textContent = divCounter.textContent + indexCount;
// Функция для загрузки счетчиков посещений с сервера
async function loadVisitors() {
    const response = await fetch('/visitors');
    const data = await response.json();
    return data;
}

// Функция для обновления счетчика на странице
async function updateCounter() {
    const visitors = await loadVisitors();
    const indexCount = visitors['index.html'] || 0;
    const aboutCount = visitors['about.html'] || 0;
    divCounter.innerHTML = `Страница index.html: ${indexCount} просмотров<br>Страница about.html: ${aboutCount} просмотров`;
}

// Вызываем функцию обновления счетчика при загрузке страницы
document.addEventListener('DOMContentLoaded', updateCounter);
