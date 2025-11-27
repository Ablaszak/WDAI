let len = 0;
let set = "";

function gen_len(){
    let l = parseInt(document.getElementById("minlength").value);
    let r = parseInt(document.getElementById("maxlength").value);
    len = Math.floor(Math.random() * (r - l + 1)) + l;
}

function gen_set(){
    set= "qwertyuiopasdfghjklzxcvbnm";
    if(document.getElementById("special").checked)
        set = set + "!@#$%^&*()_-+=[{]};:',<.>/?";

    if(document.getElementById("big").checked)
        set = set + "QWERTYUIOPASDFGHJKLZXCVBNM";

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