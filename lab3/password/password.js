let len = 0;
let set = [];

function gen_len(){
    let l = document.getElementById("minlength");
    let r = document.getElementById("maxlength");
    len = Math.floor(Math.random() * (r + 1 - l)) + l;
}

function gen_set(){

    if(document.getElementById("special").checked)
    {
        for(let i = 33; i<65; i++)
            set.push(String.fromCharCode(i));
        for(let i = 91; i<97; i++)
            set.push(String.fromCharCode(i));
        for(let i = 173; i<177; i++)
            set.push(String.fromCharCode(i));
    }

    if(document.getElementById("big").checked)
        for(let i = 65; i<91; i++)
            set.push(String.fromCharCode(i));


    for(let i = 97; i<173; i++)
        set.push(String.fromCharCode(i));
}

function gen_password(){
    let pwd = "";
    for(let i=0; i<len; i++)
        pwd = pwd + set[(Math.floor(Math.random() * set.length))]
    return pwd;
}

function run(){
    gen_len();
    gen_set();
    alert("Hasło:" + gen_password());
}