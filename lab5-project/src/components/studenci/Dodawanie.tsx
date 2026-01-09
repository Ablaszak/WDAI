import {useState} from "react";
import type {Student} from "./StudentManager.tsx";


interface DodawanieProps{
    dodaj: (student: Student) => void;
}

export default function Dodawanie(props : DodawanieProps){

    const[imie, setImie] = useState("");
    const[nazwisko, setNazwisko] = useState("");
    const[rok, setRok] = useState();

    function isButtonDisabled(){
        return (imie == '' || nazwisko == '' || rok == '' || isNaN(rok))
    }

    function handleClick(){
        props.dodaj({imie, nazwisko, rok});
    }

    return (<>
        <label>
            Podaj imie (albo imię?)
            <input
                onChange = {fun => setImie(fun.target.value)}
            />
            <br></br>
            Podaj nazwisko
            <input
                onChange = {fun => setNazwisko(fun.target.value)}
            />
            <br></br>
            Podaj rocznik
            <input
                onChange = {fun => setRok(fun.target.value)}
            />
        </label>
        <br></br>
        <button
            onClick = {handleClick}
            disabled = {isButtonDisabled()}
        >Dodaj</button>
    </>)
}