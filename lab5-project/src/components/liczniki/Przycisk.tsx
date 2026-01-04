interface LicznikProps{
    increment: () => void;
}

export default function Przycisk(props : LicznikProps){
    return(
        <button onClick={props.increment}>Dodaj</button>
    )
}