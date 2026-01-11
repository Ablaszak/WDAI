import Komentarz from "./components/produkty/Komentarz.tsx";

function App() {
    return <Komentarz
        id={1}
        body={"fajne takie nie za słodkie"}
        postId={2}
        likes={123}
        user={{id: 3, username: "student", fullName:"debil"}}
    />;
}

export default App
