import {useEffect, useState} from "react";

export default function Tytul(){

    const [tytul, setTytul] = useState("Tytul");

    useEffect(() => {document.title = tytul}, [tytul]);

    return(<>
        <label>
            <input
                type = "text"
                onChange = {fun => setTytul(fun.target.value)}
            />
        </label>
    </>)

}