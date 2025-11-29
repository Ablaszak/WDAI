const game = document.querySelector(".The_Game");
const speed = 5;

function run(){

    function move(){

        let pipes = game.querySelectorAll(".pipe");

        for(let pipe of pipes){
            if(pipe.getBoundingClientRect().right < 0)
                pipe.remove();
            else{
                let position = parseInt(pipe.style.left);
                pipe.style.left = (position - speed) + 'px';
            }
        }
        requestAnimationFrame(move);
    }
    let pipeXdist = 0;
    function spawnPipe(){

        if(pipeXdist > 75)
        {
            pipeXdist = 0;

            let pipeYdist = (Math.random() * 15) + 5; // (5 , 20)
            let mid = (Math.random() * 20) + 40; // (40, 60);

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

run();