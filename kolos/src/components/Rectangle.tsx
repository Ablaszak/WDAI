export default function Rectangle({ scale = 1 }: { scale?: number }) {
    return (
        <div
            style={{
                width: 120 * scale,
                height: 60 * scale,
                background: "black",
            }}
        />
    );
}
