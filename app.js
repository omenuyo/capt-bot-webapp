let tg = window.Telegram.WebApp;

// Сообщаем телеграму, что приложение готово
tg.ready();

// Устанавливаем цвет кнопки MainButton
tg.MainButton.color = '#2481cc';
tg.MainButton.textColor = '#ffffff';

const btn = document.getElementById("send-btn");
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

// Обработка кнопки из самого интерфейса WebApp (если пользователь не использует MainButton от TG)
btn.addEventListener("click", () => {
    let family = familyInput.value.trim();
    let time = timeInput.value.trim();
    
    if (family === "" || time === "") {
        tg.showAlert("Пожалуйста, заполните оба поля!");
        return;
    }
    
    let data = {
        family: family,
        time: time
    };
    
    tg.sendData(JSON.stringify(data));
});

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
