const game = document.querySelector(".The_Game");
const speed = 5;
let basePos = 0
//vertical bird speed, NEGATIVE values makes birb fly UP
let birbSpeed = 0;
const birb = document.getElementById("leBirb");
let scoreCtr = 0;
const scoreDisplay = document.getElementById("scoreDisplay");
const frames = ["./assets/Flappy%20Bird/yellowbird-upflap.png",
    "./assets/Flappy%20Bird/yellowbird-midflap.png",
    "./assets/Flappy%20Bird/yellowbird-downflap.png"];


function run(){

    if(!gameIsRunning)
        return;
    document.getElementById("message").remove();

    function move(){

        if(!gameIsRunning)
            return;

        let birbPos = birb.getBoundingClientRect();

        // delete and move pipes
        let pipes = game.querySelectorAll(".pipe");

        for(let pipe of pipes){
            if(pipe.getBoundingClientRect().right < 0)
                pipe.remove();
            else{
                let position = parseInt(pipe.style.left);
                pipe.style.left = (position - speed) + 'px';
            }

            // check pipe-bird collision
            let pipePos = pipe.getBoundingClientRect();
            if(
                birbPos.right > pipePos.left &&
                birbPos.left < pipePos.right &&
                birbPos.bottom > pipePos.top &&
                birbPos.top < pipePos.bottom
            ){
                die();
            }
        }

        // move and count score fields
        let scores = game.querySelectorAll(".scoreField");

        for(let score of scores){
            let position = parseInt(score.style.left);
            score.style.left = (position - speed) + 'px';

            // check score-bird collision
            let scorePos = score.getBoundingClientRect();
            if(birbPos.right > scorePos.left){
                let sound = new Audio("./assets/Sound Efects/point0.wav");
                sound.play();
                score.remove();
                scoreCtr++;
                let num0 = Math.floor(scoreCtr/10);
                let num1 = scoreCtr%10;
                scoreDisplay.innerHTML = `<img alt="score number" src= "./assets/UI/Numbers/${num0}.png"><img alt="score number" src= "./assets/UI/Numbers/${num1}.png">`;
            }

        }

        // move ground
        basePos -= speed;
        document.querySelector(".base").style.backgroundPositionX = basePos + "px";

        moveBirb();

        // check collisions
        let pos = birb.getBoundingClientRect();
        if(pos.bottom >= document.querySelector(".base").getBoundingClientRect().top
            || pos.top <= game.getBoundingClientRect().top){
            die();
        }

        requestAnimationFrame(move);
    }

    function moveBirb(){
        birbSpeed += 1;
        birb.style.top = birb.getBoundingClientRect().top + birbSpeed + "px";
        birb.style.transform = "rotate(" + birbSpeed + "deg)";
    }

    function die(){

        // stop game
        gameIsRunning = false;
        lost = true;

        let sound1 = new Audio("./assets/Sound Efects/hit.wav");
        sound1.play();

        // spawn "gameover" sign
        let gameover = document.createElement("div");
        game.append(gameover);
        gameover.className = "gameover";

        //go down
        let base = document.getElementById("base");

        let sound = new Audio("./assets/Sound Efects/die.wav");
        sound.play();

        requestAnimationFrame(falldown);

        function falldown(){
            if(birb.getBoundingClientRect().bottom > base.getBoundingClientRect().top)
                return;
            moveBirb();
            requestAnimationFrame(falldown);
        }


        displayScoreBoard();

    }

    function displayScoreBoard(){
        let tempScoreBoard = JSON.parse(localStorage.getItem("scoreBoard1"));
        if(tempScoreBoard == null)
            tempScoreBoard = [0,0,0,0,0];
        if(scoreCtr > tempScoreBoard[4])
            tempScoreBoard[4] = scoreCtr;
        tempScoreBoard.sort((a, b) => b - a);
        localStorage.setItem("scoreBoard1", JSON.stringify(tempScoreBoard));

        let boardDisplay = document.createElement("div");
        boardDisplay.className = "scoreBoard";
        let innerHtml = "<table>"
        let rowCtr = 1;
        for (let s of tempScoreBoard) {
            innerHtml += `<tr>
                        <td><img alt="score" src="./assets/UI/Numbers/${rowCtr}.png"></td>
                        <td><img alt="score" src="./assets/UI/Numbers/${Math.floor(s/10)}.png"><img alt="score" src="./assets/UI/Numbers/${s%10}.png"></td>
                        </tr>`;
            rowCtr++;
        }
        innerHtml += "</table>";
        boardDisplay.innerHTML = innerHtml;
        document.body.appendChild(boardDisplay);
    }

    let pipeXdist = 9999;
    function spawnPipe(){

        if(!gameIsRunning)
            return;

        //spawn pipes if there's enough space between them
        if(pipeXdist > 75)
        {
            pipeXdist = 0;

            // generate obstacle height and gap
            let pipeYdist = (Math.random() * 15) + 5; // (5 , 20)vh
            let mid = (Math.random() * 20) + 40; // (40, 60)vh

            //actually create pipes, just don't touch the numbers pls
            let pipe = document.createElement("div");
            pipe.className = "pipe";
            pipe.style.top = (mid + pipeYdist) + "vh";
            pipe.style.left = game.offsetWidth + "px";

            game.append(pipe);

            let topPipe = document.createElement("div");
            topPipe.className = "pipe top";
            topPipe.style.top = (mid - pipeYdist - 70) + "vh";
            topPipe.style.left = game.offsetWidth + "px";

            game.append(topPipe);

            //spawn score field
            let scoreF = document.createElement("div");
            scoreF.className = "scoreField";
            scoreF.style.left = game.offsetWidth + pipe.offsetWidth + "px";

            game.append(scoreF);

        }
        pipeXdist ++;
        requestAnimationFrame(spawnPipe);

    }

    requestAnimationFrame(spawnPipe);
    requestAnimationFrame(move);
}

let flapFrame = 0;
function flap(){
    if(flapFrame === 3){
        flapFrame = 0;
        birb.innerHTML = `<img src="./assets/Flappy%20Bird/yellowbird-upflap.png" alt="dindong">`;
        return;
    }
    birb.innerHTML = `<img src=${frames[flapFrame]} alt="dindong">`;
    flapFrame ++;
    setTimeout(flap, 50);
}

let gameIsRunning = false;
let lost = false;

document.addEventListener('keydown', ev => {
    if(ev.key === "Enter" && !gameIsRunning){
        if(lost)
            location.reload();
        gameIsRunning = true;
        run();
    }

    // Make birb fly up
    if(ev.key === " " && gameIsRunning){
        flap();
        birbSpeed = -12;
        let sound = new Audio("./assets/Sound Efects/wing.wav");
        sound.play();
    }
})