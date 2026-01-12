import { useParams } from "react-router-dom";
import { useState } from "react";
import Square from "./Square";
import Rectangle from "./Rectangle";
import Circle from "./Circle";
import type {Shape} from "./ShapeInterface";

export default function ShapeDetails() {
    const { id } = useParams();
    const shapes: Shape[] = JSON.parse(localStorage.getItem("shapes") || "[]");
    const shape = shapes.find(s => s.id === id);

    const [extra, setExtra] = useState(shape?.extra ?? "");

    if (!shape) return null;

    const displayShape = () => {
        if (shape.type == "square") return <Square />;
        if (shape.type == "rectangle") return <Rectangle />;
        return <Circle />;
    };

    return (
        <>
            <p>Typ: {shape.type}</p>
            <p>ID: {shape.id}</p>
            {displayShape()}
            <input value={extra} onChange={e => setExtra(e.target.value)} />
        </>
    );
}
