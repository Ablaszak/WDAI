interface ProduktProps{
    nazwa: string;
}

export default function Produkt(props: ProduktProps) {
    return (
        <>
            <h3>{props.nazwa}</h3>
        </>
    )
}


