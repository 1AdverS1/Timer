let timer;
let startTime;
let elapsedTime = 0;
let running = false;

const display = document.getElementById('display');
const results = document.getElementById('results');

const startTimer = () => {
    clearInterval(timer);
    timer = setInterval(updateTimer, 10);
    startTime = Date.now() - elapsedTime;
    running = true;
};

const stopTimer = () => {
    clearInterval(timer);
    running = false;
};

const resetTimer = () => {
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    results.value = '';
    running = false;
};

const reverseTimer = () => {
    clearInterval(timer);
    timer = setInterval(updateTimerReverse, 10);
    startTime = Date.now() + elapsedTime;
    running = true;
};

const clearTimer = () => {
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    results.value = '';
    localStorage.removeItem('savedResults');
    running = false;
};

const saveTimer = () => {
    results.value += `${display.textContent}\n`;
    localStorage.setItem('savedResults', results.value);
};

const updateTimer = () => {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    updateDisplay(elapsedTime);
};

const updateTimerReverse = () => {
    const currentTime = Date.now();
    elapsedTime = startTime - currentTime;
    updateDisplay(elapsedTime);
    if (elapsedTime <= 0) {
        clearInterval(timer);
        running = false;
    }
};

const updateDisplay = (time) => {
    const milliseconds = time % 1000;
    const seconds = (time / 1000) % 60 | 0;
    const minutes = (time / (1000 * 60)) % 60 | 0;
    const hours = (time / (1000 * 60 * 60)) % 24 | 0;

    const displayHours = (hours < 10) ? `0${hours}` : hours;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMilliseconds = (milliseconds < 100) ? (milliseconds < 10 ? `00${milliseconds}` : `0${milliseconds}`) : milliseconds;

    display.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}:${displayMilliseconds}`;
};



document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('stopBtn').addEventListener('click', stopTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('reverseBtn').addEventListener('click', reverseTimer);
document.getElementById('clearBtn').addEventListener('click', clearTimer);
document.getElementById('saveBtn').addEventListener('click', saveTimer);

window.onload = () => {
    const savedResults = localStorage.getItem('savedResults');
    if (savedResults) {
        results.value = savedResults;
    }
};