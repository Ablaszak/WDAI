import {useState} from "react";

export default function Licznik(){
    //let value=0;
    const [value, setValue] = useState(0);

    function Przycisk(){
        function handleClick(){
            setValue(value + 1);
        }
        return(
            <button onClick={handleClick}>Dodaj</button>
        )
    }

    return(<>
            <Przycisk/>
            <p>{value}</p>
    </>)
    // ESLint krzyczy na mnie, że nie powinno się tak robić,
    // ale zaraz przeniosę licznik do innego komponentu więc powinno być git

}