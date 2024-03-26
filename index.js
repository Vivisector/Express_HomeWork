const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const port = 9000;

app.use(express.static(path.join(__dirname, 'static')));

// Функция для обновления счетчика посещений для указанной страницы
function updateCounter(page) {
    // Читаем данные из файла
    const visits = JSON.parse(fs.readFileSync('visits.json', 'utf8'));
    // Увеличиваем счетчик для указанной страницы
    visits[page]++;
    // console.log(visits);
    // Записываем обновленные данные обратно в файл
    fs.writeFileSync('visits.json', JSON.stringify(visits));
}

app.get('/visits.json', (req, res) => {
    const visits = JSON.parse(fs.readFileSync('visits.json', 'utf8'));
    res.json(visits);
});

app.get('/static/index.html', (req, res) => {
    // console.log('Запрос на /index.html получен');
    updateCounter('index.html'); // Обновляем счетчик для index.html
    res.sendFile(path.join(__dirname, 'static', 'index.html')); // Отправляем страницу index.html
});

// Обработчик для страницы about.html
app.get('/static/about.html', (req, res) => {
    updateCounter('about.html'); // Обновляем счетчик для about.html
    res.sendFile(path.join(__dirname, 'static', 'about.html')); // Отправляем страницу about.html
});

app.listen(port, () => {
    console.log(`Сервер запущен и слушает порт номер ${port}`);
});
