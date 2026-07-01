let tg = window.Telegram.WebApp;

// Сообщаем телеграму, что приложение готово
tg.ready();

// Устанавливаем цвет кнопки MainButton
tg.MainButton.color = '#2481cc';
tg.MainButton.textColor = '#ffffff';

const familyInput = document.getElementById("family");
const timeInput = document.getElementById("time");

// Функция проверки полей
function checkInputs() {
    if (familyInput.value.trim() !== "" && timeInput.value.trim() !== "") {
        tg.MainButton.text = "РАЗОСЛАТЬ";
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

familyInput.addEventListener('input', checkInputs);
timeInput.addEventListener('input', checkInputs);



// Обработка нажатия на MainButton самого Telegram
Telegram.WebApp.onEvent('mainButtonClicked', function() {
    let family = familyInput.value.trim();
    let time = timeInput.value.trim();
    
    let data = {
        family: family,
        time: time
    };
    
    tg.sendData(JSON.stringify(data));
});
