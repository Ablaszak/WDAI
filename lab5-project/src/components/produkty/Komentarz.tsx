import {useState} from 'react';
import "./Komentarz.css"

interface komentarzProps{
    id : number;
    body : string;
    postId : number;
    likes : number;
    user : {id : number, username : string, fullName : string};
}

export default function Komentarz(props : komentarzProps) {

    const [likes, setLikes] = useState(props.likes);

    function incrementLikes(){
        setLikes(prev => prev + 1);
    }
    function decrementLikes(){
        setLikes(prev => prev - 1);
    }

    return (<>
        <div className={"div"}>
            <h1>{props.user.username}</h1>
            <p>{props.user.fullName}</p>
        </div>
        <p>{props.body}</p>
        <div className={"div"}>
            <button onClick={incrementLikes}>👍</button>
            <p>{likes}</p>
            <button onClick={decrementLikes}>👎</button>
        </div>
        </>);
}
