const game = document.querySelector(".The_Game");

function run(){

    function move(){

        let pipes = game.querySelectorAll(".pipe");

        for(let pipe of pipes){
            if(pipe.getBoundingClientRect().right < 0)
                pipe.remove();
            else{
                let position = parseInt(pipe.style.left);
                pipe.style.left = (position - 3) + 'px';
            }
        }
        requestAnimationFrame(move);
    }
    let pipeXdist = 0;
    function spawnPipe(){

        if(pipeXdist > 150)
        {
            pipeXdist = 0;
            let pipeYdist = 10;
            let pipe = document.createElement("div");
            pipe.className = "pipe";
            pipe.style.bottom = 0 + "vh";
            pipe.style.left = game.offsetWidth + "px";

            game.append(pipe);
        }
        pipeXdist ++;
        requestAnimationFrame(spawnPipe);

    }


    requestAnimationFrame(spawnPipe);
    requestAnimationFrame(move);

}

run();