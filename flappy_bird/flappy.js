const game = document.querySelector(".The_Game");
const speed = 5;

//vertical bird speed, NEGATIVE values makes birb fly UP
let birbSpeed = 0;
const birb = document.getElementById("leBirb");

function run(){

    function move(){

        // delete and move pipes
        let pipes = game.querySelectorAll(".pipe");

        for(let pipe of pipes){
            if(pipe.getBoundingClientRect().right < 0)
                pipe.remove();
            else{
                let position = parseInt(pipe.style.left);
                pipe.style.left = (position - speed) + 'px';
            }
        }

        // move the birb
        birbSpeed++;
        birb.style.top = birb.getBoundingClientRect().top + birbSpeed + "px";


        requestAnimationFrame(move);
    }

    let pipeXdist = 0;
    function spawnPipe(){

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
        birbSpeed = -15;
})