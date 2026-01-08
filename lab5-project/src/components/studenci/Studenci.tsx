interface Student{
    imie : string;
    nazwisko : string;
    rocznik : number;
}

export default function Studenci(){

    const Students: Student[] = [{imie: "WO", nazwisko:"WI", rocznik: 2026}, {imie: "Algo", nazwisko:"WI", rocznik: 2026}, {imie: "Algo-api", nazwisko:"Samogłoski", rocznik: 2026}];

    return(<table>
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
    </table>)
}