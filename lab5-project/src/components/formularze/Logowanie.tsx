import {useState} from "react";

export default function Logowanie(){
    const[H1, setH1] = useState('');
    const[H2, setH2] = useState('');
    const[Name, setName] = useState('');

    function isButtonDisabled(){
        return (H1 == '' || H2 == '' || Name == '')
    }

    function handleClick(){
        if(H1 == H2)
            {alert ("Zalogowano poprawnie")}
        if(H1 != H2)
            {alert ("Hasła nie są zgodne")}
    }

    return (<>
        <label>
            Nazwa użytkownika
            <input
                onChange = {fun => setName(fun.target.value)}
            />
            <br></br>
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
        <br></br>
        <button
            onClick = {handleClick}
            disabled = {isButtonDisabled()}
        >Zaloguj</button>
    </>)
}