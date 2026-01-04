import {useState} from "react";

export default function Aktualizacja(){
    const [produkt, setProdukt] = useState({nazwa: "warunek", cena: 540});
    const updateProdukt = () => {
        setProdukt(prevState => ({...prevState, cena: 1080}));
    }

    return <>
        <div>{"Aktualnie " + produkt.nazwa + " kosztuje " + produkt.cena}</div>
        <button onClick={updateProdukt}>Zmień cenę</button>
    </>
}