import {useState} from "react";
import type {Student} from "./StudentManager.tsx";


interface DodawanieProps{
    dodaj: (student: Student) => void;
}

export default function Dodawanie(props : DodawanieProps){

    const[imie, setImie] = useState("");
    const[nazwisko, setNazwisko] = useState("");
    const[rocznik, setRocznik] = useState(NaN);

    function isButtonDisabled(){
        return (imie == '' || nazwisko == '' || isNaN(rocznik))
    }

    function handleClick(){
        props.dodaj({imie, nazwisko, rocznik});
    }

    return (<>
        <label>
            Podaj imię
            <input
                type = "text"
                onChange = {fun => setImie(fun.target.value)}
            />
            <br></br>
            Podaj nazwisko
            <input
                type = "text"
                onChange = {fun => setNazwisko(fun.target.value)}
            />
            <br></br>
            Podaj rocznik
            <input
                type = "number"
                onChange = {fun =>
                    setRocznik(fun.target.value == "" ? NaN : Number(fun.target.value))}
            />
        </label>
        <br></br>
        <button
            onClick = {handleClick}
            disabled = {isButtonDisabled()}
        >Dodaj</button>
    </>)
}