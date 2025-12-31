let currentScreen = 1;
let startX = 0;

// Персонализация и переход к экрану 2
function startCard() {
    const username = document.getElementById('username').value || 'Дорогая моя';
    document.getElementById('task-title').textContent = `${username}, эта новогодняя открытка тебе!`;
    document.getElementById('congrats').textContent = `Ты - мой главный подарок, ${username}! 💖`;
    document.getElementById('support').textContent = `Я обожаю тебя и безумно скучаю. Ты - лучшая девушка на свете, прочти этот текст, под эту песню. 
    Почему именно она, потому что она напоминает мне наш первый вечер вместе. Эта песня играла в фильме, который мы смотрели. 
    Мне очень хочется, чтобы ты почувствовала это письмо не глазами, а чем-то глубже - как тихое «я рядом», даже когда между нами расстояние.

Ты для меня человек, к которому хочется тянуться. О котором думаешь в течение дня. Которого хочется беречь - в мелочах, в словах, в паузах. Ты для меня важна не за что-то, а просто потому что ты - это ты.

Я знаю, что сейчас у тебя непростой период. И если вдруг бывают моменты, когда сил меньше, чем обычно, - это нормально. Ты не обязана быть сильной всегда. Но знай: есть человек, который видит твою хрупкость и твою стойкость одновременно и одинаково ценит обе. И готов подставить своё плечо, под все трудности !

Я очень дорожу тем, что между нами есть. Тем теплом, которое появляется даже на расстоянии. Тем, как ты умеешь чувствовать, думать, быть настоящей. Пусть в новом году у тебя будет больше спокойствия, света и ощущения, что тебя поддерживают - не громко, но по-настоящему.

С новым годом тебя, моя ${username}!
Пусть этот год, будет для тебя началом нового счасться!`;
    
    
    goToScreen(2);
    vibrate(100); // Вибрация
    requestFullscreen();
}

// Переход между экранами
function goToScreen(number) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active', 'show');
    });

    const nextScreen = document.getElementById(`screen${number}`);
    nextScreen.classList.add('active');
    currentScreen = number;

    if (number === 3) {
        document.getElementById('music').play();
        vibrate([100, 50, 100]);

        startFinalScene();
    }
}

// Вибрация
function vibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
}

// Fullscreen (эффект приложения)
function requestFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
    }
}

// Свайпы: вперед/назад
document.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
document.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    let diff = endX - startX;
    if (Math.abs(diff) > 50) {
        if (diff < 0 && currentScreen < 3) goToScreen(currentScreen + 1); // свайп влево
        if (diff > 0 && currentScreen > 1) goToScreen(currentScreen - 1); // свайп вправо
    }
});

// ❄️ Падающий снег
const snowContainer = document.getElementById('snow');

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';

    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
    snowflake.style.opacity = Math.random();
    snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';

    snowContainer.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 10000);
}

// создаём снег регулярно
setInterval(createSnowflake, 300);

// ✨ Золотые искры
document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.getElementById('snow');

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.textContent = '✦';

        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.fontSize = (Math.random() * 6 + 6) + 'px';
        sparkle.style.animationDuration =
            (Math.random() * 10 + 12) + 's, ' +
            (Math.random() * 2 + 2) + 's';

        snowContainer.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 20000);
    }

    // редкие искры
    setInterval(createSparkle, 2500);
});

function startFinalScene() {
    const screen = document.getElementById('screen3');
    const textElement = document.getElementById('support');

    // сохраняем текст
    const fullText = textElement.textContent;
    textElement.textContent = '';
    textElement.style.opacity = 1;

    // 1️⃣ показать фото и заголовок
    setTimeout(() => {
        screen.classList.add('show');
    }, 300);

    // 2️⃣ начать писать текст
    setTimeout(() => {
        typeText(textElement, fullText, 35);
    }, 1800);
}

function typeText(element, text, speed) {
    let index = 0;

    function typing() {
        if (index >= text.length) return;

        const currentChar = text.charAt(index);
        const nextChars = text.substring(index, index + 2);

        // ✍️ если новый абзац — делаем паузу
        if (nextChars === '\n\n') {
            element.textContent += '\n\n';
            index += 2;

            // микро-пауза между абзацами
            setTimeout(typing, 900);
            return;
        }

        element.textContent += currentChar;
        index++;

        setTimeout(typing, speed);
    }

    typing();
}


