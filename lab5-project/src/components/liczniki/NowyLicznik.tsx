import {useState} from "react";
import Przycisk from "./Przycisk.tsx";


export default function Licznik(){
    //let value=0;
    const [value, setValue] = useState(0);
    function handleClick(){
        setValue(value + 1);
    }


    return(<>
        <Przycisk increment={handleClick}/>
        <p>{value}</p>
    </>)

}