export default function Circle({ scale = 1 }: { scale?: number }) {
    return (
        <div
            style={{
                borderRadius: 50,
                width: 80 * scale,
                height: 80 * scale,
                background: "black",
            }}
        />
    );
}
