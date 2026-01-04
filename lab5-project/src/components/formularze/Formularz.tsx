import {useState} from "react";

export default function Formularz(){
    const[txt, settxt] = useState('');

    return (<>
        <input
            onChange = {fun => settxt(fun.target.value)}
        />
        <div>{txt}</div>
    </>)
}