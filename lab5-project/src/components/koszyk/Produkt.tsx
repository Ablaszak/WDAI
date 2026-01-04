interface ProduktProps{
    name: string;
}

export default function Produkt(props: ProduktProps) {
    return (
        <>
            <h3>{props.name}</h3>
        </>
    )
}


