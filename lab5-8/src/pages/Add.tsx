import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type {Article} from "../components/interfaces.tsx";

export default function Add() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();


    function getArticles(): Article[]{
        const data = localStorage.getItem("articles");
        return data ? JSON.parse(data) : [];
    }

    function saveArticles(articles: Article[]) {
        localStorage.setItem("articles", JSON.stringify(articles));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const articles = getArticles();

        const newArticle = {
            id: Date.now(),
            title,
            content
        };

        saveArticles([...articles, newArticle]);
        navigate("/blog");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Dodaj artykuł</h1>

            <input
                placeholder="Tytuł"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Treść"
                value={content}
                onChange={e => setContent(e.target.value)}
            />

            <button type="submit">DODAJ</button>
        </form>
    );
}
