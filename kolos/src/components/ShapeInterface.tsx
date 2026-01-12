export type ShapeType = "square" | "rectangle" | "circle";

export interface Shape {
    id: string;
    type: ShapeType;
    extra: string;
}
