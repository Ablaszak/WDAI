import {useState} from "react";
import Przycisk from "./Przycisk.tsx";


export default function Licznik(){
    const [value, setValue] = useState( () => {
        const val = localStorage.getItem("savedValue1");
        if(val != null){
            return Number(val);
        }
        return 0;
    })

    function handleClick(){
        const next = value + 1;
        setValue(next);
        localStorage.setItem("savedValue1", String(next));
    }


    return(<>
        <Przycisk increment={handleClick}/>
        <p>{value}</p>
    </>)

}