const game = document.querySelector(".The_Game");
const speed = 5;
let basePos = 0
//vertical bird speed, NEGATIVE values makes birb fly UP
let birbSpeed = 0;
const birb = document.getElementById("leBirb");

function run(){

    if(!gameIsRunning)
        return;

    function move(){

        if(!gameIsRunning)
            return;

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
            let birbPos = birb.getBoundingClientRect();
            let pipePos = pipe.getBoundingClientRect();
            //left-right
            if(
                birbPos.right > pipePos.left &&
                birbPos.left < pipePos.right &&
                birbPos.bottom > pipePos.top &&
                birbPos.top < pipePos.bottom
            )
                    die();
        }

        // move ground
        basePos -= speed;
        document.querySelector(".base").style.backgroundPositionX = basePos + "px";

        // move the birb
        birbSpeed += 1;
        birb.style.top = birb.getBoundingClientRect().top + birbSpeed + "px";
        birb.style.transform = "rotate(" + birbSpeed + "deg)";

        // check collisions
        let pos = birb.getBoundingClientRect();
        if(pos.bottom >= document.querySelector(".base").getBoundingClientRect().top
            || pos.top <= game.getBoundingClientRect().top)
            die();

        requestAnimationFrame(move);
    }

    function die(){
        gameIsRunning = false;
        let gameover = document.createElement("div");
        game.append(gameover);
        gameover.className = "gameover";
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
        }
        pipeXdist ++;
        requestAnimationFrame(spawnPipe);

    }

    requestAnimationFrame(spawnPipe);
    requestAnimationFrame(move);
}

let gameIsRunning = false;
document.addEventListener('keydown', ev => {
    if(ev.key === "Enter" && !gameIsRunning){
        gameIsRunning = true;
        run();
    }

    // Make birb fly upw
    if(ev.key === " ")
        birbSpeed = -12;
})