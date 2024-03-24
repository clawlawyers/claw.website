export function CaseCard({ name, date, court, citations }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, backgroundColor: "#8940FF", borderRadius: 10 }}>
            <div>
                <div style={{ fontSize: 23, fontWeight: 700 }}>{name}</div>
                <div style={{ fontSize: 13, color: '#DBD8D8' }}>
                    <span>{date}</span>,
                    <span>{' ' + court}</span>
                </div>
                <div style={{ fontSize: 13, color: '#DBD8D8' }}>Number of citations- {citations}</div>
            </div>
            <div>
                <button style={{ border: "none", padding: "12px 16px", backgroundColor: "white", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>View document</button>
            </div>
        </div>
    )
}