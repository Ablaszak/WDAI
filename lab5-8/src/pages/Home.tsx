import {Link} from "react-router-dom";

export default function Home() {

    return (<>
        <h1>Turbo nagłówek świetnej strony głównej</h1>
        <Link to="/blog">Blog</Link>
        <br></br>
        <Link to="/add">Dodaj</Link>
    </>);
}
