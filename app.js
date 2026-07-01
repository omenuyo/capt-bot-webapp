let tg = window.Telegram.WebApp;

// Сообщаем телеграму, что приложение готово
tg.ready();

// Устанавливаем цвет кнопки MainButton
const eventType = document.getElementById("event-type");
const familyInput = document.getElementById("family");
const timeInput = document.getElementById("time");
const familyGroup = familyInput.parentElement;
const timeGroup = timeInput.parentElement;

// Обновление видимости полей в зависимости от типа
function updateFields() {
    let type = eventType.value;
    
    // Семья нужна только для капта
    if (type === 'capt') {
        familyGroup.classList.remove('hidden');
    } else {
        familyGroup.classList.add('hidden');
    }
    
    // Время не нужно для срочного собрания (оно "Сейчас")
    if (type === 'meeting') {
        timeGroup.classList.add('hidden');
    } else {
        timeGroup.classList.remove('hidden');
    }
    
    checkInputs();
}

eventType.addEventListener('change', updateFields);

function checkInputs() {
    let type = eventType.value;
    let isValid = false;
    
    let fVal = familyInput.value.trim();
    let tVal = timeInput.value.trim();
    
    if (type === 'capt') {
        isValid = (fVal !== "" && tVal !== "");
    } else if (type === 'kidnap' || type === 'contract') {
        isValid = (tVal !== "");
    } else if (type === 'meeting') {
        isValid = true; // Для собрания ничего вводить не нужно
    }

    if (isValid) {
        tg.MainButton.text = "РАЗОСЛАТЬ";
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

familyInput.addEventListener('input', checkInputs);
timeInput.addEventListener('input', checkInputs);



Telegram.WebApp.onEvent('mainButtonClicked', function() {
    let type = eventType.value;
    let family = familyInput.value.trim();
    let time = timeInput.value.trim();
    
    if (type === 'meeting') time = "Сейчас";
    
    let data = {
        type: type,
        family: family,
        time: time
    };
    
    tg.sendData(JSON.stringify(data));
});

// Инициализация при загрузке
updateFields();
