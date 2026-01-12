import { useParams } from "react-router-dom";
import type {Article} from "../components/interfaces.tsx";

export default function Article() {

    function getArticles(): Article[]{
        const data = localStorage.getItem("articles");
        return data ? JSON.parse(data) : [];
    }

    const { id } = useParams();
    const articles = getArticles();

    const article = articles.find(a => a.id === Number(id));

    if (!article) {
        return <p>Artykuł nie istnieje</p>;
    }

    return (
        <>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
        </>
    );
}
