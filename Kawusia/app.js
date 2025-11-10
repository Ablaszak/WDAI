// we tu dodaj jakiś ładny opis że to kradzione ale tak po mojemu kradzione xD
let TIME_LIMIT = 45;
const FULL_DASH_ARRAY = 283;
// Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

// Moje rzeczy, coffee specific:
let brewTimes = [0,0,0,0,0]
let brewCycle = 0;

// kolor dla paska postępu timera
const COLOR_CODES = {
    info: {
        color: "coffee"
    }
};
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">
    ${formatTime(timeLeft)}
  </span>
</div>
`

function formatTime(time) {
    // Usunąłem minuty bo nigdy nie będę ich używał + chyba lepiej będzie to wyglądać z samymi sekundami
    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
        seconds = `0${seconds}`;
    } // fajne

    seconds = Math.floor(seconds);
    // The output in MM:SS format
    // tutaj też zmieniłem na samo SS
    return `${seconds}`;
}

function startTimer(input) {

    // Moje rzeczy, coffee specific:
    if(brewCycle === 0){
        brewTimes = input;
    }
    TIME_LIMIT = brewTimes[brewCycle];
    brewCycle++;

    timerInterval = setInterval(() => {

        // The amount of time passed increments by one // a tak na prawdę co 0.1
        // zmieniłem bo dzięki temu jest płynniej, jedyne co to teraz trzeba dodać zaokrąglanie liczby w timerze
        timePassed = timePassed += 0.1;
        timeLeft = TIME_LIMIT - timePassed;

        // The time left label is updated
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        setCircleDasharray();

        if (timeLeft === 0) {
            theEnd();
        }

    }, 100);
}

function theEnd(){

}

// Divides time left by the defined time limit.
function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

// Update the dasharray value as time passes, starting with 283
function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}