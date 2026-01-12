export default function Square({ scale = 1 }: { scale?: number }) {
    return (
        <div
            style={{
                width: 80 * scale,
                height: 80 * scale,
                background: "black",
            }}
        />
    );
}
