import Komentarze from "./components/produkty/Komentarze.tsx";
import Koszyk from "./components/koszyk/Koszyk.tsx";
import NowyKoszyk from "./components/koszyk/NowyKoszyk.tsx";
import Licznik from "./components/liczniki/NowyLicznik.tsx";
import Haslo from "./components/formularze/Haslo.tsx";
import Logowanie from "./components/formularze/Logowanie.tsx";
import Ternary from "./components/inne/Ternary.tsx";
import Aktualizacja from "./components/inne/Aktualizacja.tsx";
import Studenci from "./components/studenci/Studenci.tsx";
import StudentManager from "./components/studenci/StudentManager.tsx";
import Tytul from "./components/efekty/Tytul.tsx";
import Odliczanie from "./components/efekty/Odliczanie.tsx";

function App() {
    return (<>
        {/*<Koszyk/>*/}
        <NowyKoszyk/>
        <Licznik/>
        <Haslo/>
        <Logowanie/>
        <Ternary/>
        <Aktualizacja/>
        <Studenci/>
        <StudentManager/>
        <Licznik/>
        <Tytul/>
        <Odliczanie/>
        <Komentarze/>
        </>)
}

export default App
