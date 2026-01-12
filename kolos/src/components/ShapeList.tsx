import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Square from "./Square";
import Rectangle from "./Rectangle";
import Circle from "./Circle";
import type { Shape, ShapeType } from "./ShapeInterface";

export default function ShapeList() {
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [filter, setFilter] = useState<ShapeType | "all">("all");
    const [scale, setScale] = useState(1);
    const navigate = useNavigate();

    const [keyInt, setKeyInt] = useState(4);

    useEffect(() => {
        const saved = localStorage.getItem("shapes");
        if (saved) {
            setShapes(JSON.parse(saved));
        } else {
            setShapes([
                { id: String(1), type: "square", extra: Math.random().toString() },
                { id: String(3), type: "rectangle", extra: Math.random().toString() },
                { id: String(2), type: "circle", extra: Math.random().toString() },
            ]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("shapes", JSON.stringify(shapes));
    }, [shapes]);

    useEffect(() => {
        const t1 = setTimeout(() => setScale(0.5), 2000);
        const t2 = setTimeout(() => setScale(1), 3000);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    const addShape = (type: ShapeType) => {
        setShapes(s => [...s, {id: String(keyInt), type, extra: Math.random().toString()}]);
        setKeyInt( keyInt + 1);
    }

    const removeShape = (id: string) =>
        setShapes(s => s.filter(sh => sh.id !== id));

    const visible = filter === "all" ? shapes : shapes.filter(s => s.type === filter);

    const displayShape = (shape: Shape) => {
        const common = { scale };
        if (shape.type === "square") return <Square {...common} />;
        if (shape.type === "rectangle") return <Rectangle {...common} />;
        return <Circle {...common} />;
    };

    return (
        <>
            <button onClick={() => addShape("square")}>Dodaj kwadrat</button>
            <button onClick={() => addShape("rectangle")}>Dodaj prostokąt</button>
            <button onClick={() => addShape("circle")}>Dodaj koło</button>

            <select onChange={e => setFilter(e.target.value as any)}>
                <option value="all">Wszystkie</option>
                <option value="square">Kwadraty</option>
                <option value="rectangle">Prostokąty</option>
                <option value="circle">Koła</option>
            </select>

            {visible.map(shape => (
                <div key={shape.id} onClick={() => navigate("/shape/" + shape.id)}>
                    {displayShape(shape)}
                    <button onClick={fun => { fun.stopPropagation(); removeShape(shape.id); }}>
                        usuń
                    </button>
                </div>
            ))}
        </>
    );
}
