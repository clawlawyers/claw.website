import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircularProgress from '@mui/material/CircularProgress';
import { useMemo } from 'react';

const facts = [
    "India has the world's longest written constitution, adopted on January 26, 1950.",
    "The Supreme Court of India in New Delhi is the highest judicial authority in the country.",
    "The judiciary in India holds the power of judicial review, examining the constitutionality of laws and government actions.",
    "Public Interest Litigation (PIL) allows citizens direct access to the court for legal remedies in India.",
    "The Chief Justice of India administers the oath of office to the President during the swearing-in ceremony.",
    "The Supreme Court of India can issue writs for the enforcement of fundamental rights.",
    "The National Judicial Appointments Commission (NJAC) aimed to reform the appointment of judges.",
    "The Allahabad High Court is the largest in India, both in judges and population served.",
    "India's judiciary follows a hierarchical structure: Supreme Court, High Courts, and subordinate courts.",
    "Justice M. Fathima Beevi was the first woman appointed to the Supreme Court of India in 1989.",
]

export function CustomLoader() {
    const getFact = useMemo(() => {
        return facts[Math.floor(Math.random() * (facts.length - 1))]
    }, []);
    return (
        <div style={{ padding: "8px 16px", display: "flex", backgroundColor: "transparent", color: "rgba(255,255,255,0.75)", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <CircularProgress style={{ backgroundColor: "transparent" }} size="16px" color="inherit" />
            <FontAwesomeIcon icon={faLightbulb} />
            <div>
                {getFact}
            </div>
        </div>
    )
}