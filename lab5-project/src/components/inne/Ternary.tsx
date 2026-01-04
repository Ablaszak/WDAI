export default function Ternary(){
    let a = true;
    let b = false;

    return<>
        <div>{a ? "stwierdzenie a jest prawdziwe" : "stwierdzenie a jest fałszywe"}</div>
        <div>{b ? "stwierdzenie b jest prawdziwe" : "stwierdzenie b jest fałszywe"}</div>
    </>
}