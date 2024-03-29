import { Link } from "react-router-dom";

export function CaseCard({ name, date, court, citations, messageId, link }) {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", padding: 16, backgroundColor: "#8940FF", borderRadius: 10 }}>
            <div style={{ width: '80%' }}>
                <h2 style={{ fontSize: 23, fontWeight: 700 }}>{name}</h2>
                <div style={{ fontSize: 13, color: '#DBD8D8' }}>
                    <span>{date}</span>,
                    <span>{' ' + court}</span>
                </div>
                <p style={{ fontSize: 13, color: '#DBD8D8', margin: 0 }}>Number of citations- {citations}</p>
            </div>

            <Link to={link ? link : `/case/search?id=${messageId}`} style={{ border: "none", padding: "12px 16px", minWidth: 'fit-content', backgroundColor: "white", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", color: "black" }}>View document</Link>

        </div>
    )
}