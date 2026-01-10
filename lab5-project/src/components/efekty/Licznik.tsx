import {useEffect, useState} from "react";

export default function Licznik(){
    const [value, setValue] = useState(0);

    useEffect(() => {
        console.log("Hello world");
    }, []);

    function Przycisk(){

        useEffect(() => {
            console.log("licznik zwiększył się do " + value);
        });

        function handleClick(){
            setValue(value + 1);
        }
        return(
            <button onClick={handleClick}>Dodaj</button>
        )
    }

    return(<>
            <Przycisk />
            <p>{value}</p>
    </>)

}