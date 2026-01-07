import {useState} from "react";

function divTxt([h1, h2] : [string, string]){
    if(h1 == '' || h2 == '')
        return "Proszę wprowadzić hasło";
    if(h1 != h2)
        return "Hasła nie są zgodne"
    return ""
}

export default function Haslo(){
    const[H1, setH1] = useState('');
    const[H2, setH2] = useState('');

    return (<>
        <label>
            Hasło
            <input
                onChange = {fun => setH1(fun.target.value)}
            />
            <br></br>
            Powtórz hasło
            <input
                onChange = {fun => setH2(fun.target.value)}
            />
        </label>
        <div>{divTxt([H1, H2])}</div>
    </>)
}