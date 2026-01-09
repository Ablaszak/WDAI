import {useState} from "react";
import Dodawanie from "./Dodawanie.tsx"

export interface Student{
    imie : string;
    nazwisko : string;
    rocznik : number;
}

export default function StudentManager(){

    const [Students, setStudents] = useState<Student[]>([{imie: "WO", nazwisko:"WI", rocznik: 2026}, {imie: "Algo", nazwisko:"WI", rocznik: 2026}, {imie: "Algo-api", nazwisko:"Samogłoski", rocznik: 2026}])
    //const Students: Student[] = [{imie: "WO", nazwisko:"WI", rocznik: 2026}, {imie: "Algo", nazwisko:"WI", rocznik: 2026}, {imie: "Algo-api", nazwisko:"Samogłoski", rocznik: 2026}];

    const updateStudents = (student: Student) => {
        setStudents(prevState => ([...prevState, student]));
    }

    return(
        <>
        <table>
        <tbody>
        {Students.map(item => {
            return(
                <tr>
                    <td>{item.imie}</td>
                    <td>{item.nazwisko}</td>
                    <td>{item.rocznik}</td>
                </tr>
            );
        })}
        </tbody>
        </table>

        <Dodawanie dodaj={updateStudents}/>

        </>)
}