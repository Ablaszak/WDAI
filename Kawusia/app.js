// Start with an initial value of 20 seconds
const TIME_LIMIT = 20;

// Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

// kolor dla paska postępu timera
const COLOR_CODES = {
    info: {
        color: "green"
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

    // The output in MM:SS format
    // tutaj też zmieniłem na samo SS
    return `${seconds}`;
}

function startTimer() {
    timerInterval = setInterval(() => {

        // The amount of time passed increments by one
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;

        // The time left label is updated
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    }, 1000);
}