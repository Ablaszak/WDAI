import type {Article} from "../components/interfaces.tsx";
import {Link} from "react-router-dom";


export default function Blog() {

    function getArticles(): Article[]{
        const data = localStorage.getItem("articles");
        return data ? JSON.parse(data) : [];
    }

    const articles = getArticles();

    return (<>
        <h1>Blog</h1>
        <ul>
            {articles.map(item => (
                <li key={item.id}>
                    <Link to = {"/article/" + item.id}>{item.title}</Link>
                </li>
            ))
            }
        </ul>
    </>);
}
