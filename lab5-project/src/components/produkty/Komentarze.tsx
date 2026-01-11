import {useState, useEffect} from 'react';
import Komentarz, {type komentarzProps} from "./Komentarz.tsx";

export default function Komentarze() {

    const [comments, setComments] = useState<komentarzProps[]>([]);

    useEffect(() => {
        fetch("https://dummyjson.com/comments")
            .then((res) => res.json())
            .then((data) => setComments(data.comments))
    }, [])

    return (<>
        {comments.map(item => (
            <Komentarz {...item}></Komentarz>
        ))}
    </>);
}
