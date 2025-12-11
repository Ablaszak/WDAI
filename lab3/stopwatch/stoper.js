let sec = 0;
let mins = 0;
let go = false;

function timer(){
    if(go) {
        if (sec < 59)
            sec++
        else {
            mins++;
            sec = 0;
        }

        update();

        setTimeout(timer, 1000);
    }
}

function start(){
    if(!go) {
        go = true;
        timer();
    }
}
function stop(){
    go = false;
}

function reset(){
    location.reload();
}

function update(){
    document.getElementById("seconds").innerHTML = sec + "s";
    if (mins > 0)
        document.getElementById("minutes").innerHTML = mins + "min ";
}