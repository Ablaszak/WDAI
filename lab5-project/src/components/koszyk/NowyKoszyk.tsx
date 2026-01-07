import Produkt from './Produkt.tsx'

export default function NowyKoszyk() {
    const produkty = [
        "turbo produkt 1",
        "turbo produkt 10",
        "turbo produkt 100",
        "turbo produkt 10000",
        "turbo produkt 100000000000"
    ]
    return(<>
        {produkty.map((nazwa, id) => (<Produkt key={id} nazwa={nazwa} />))}
    </>)
}