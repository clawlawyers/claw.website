import React, { useState } from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';


import { CaseCard } from '../components/CaseCard';
import { ModeEdit, SearchOutlined } from '@mui/icons-material';
import { NODE_API_ENDPOINT } from '../utils/utils';
import moment from 'moment';

export default function CaseFinder() {
    const [courtName, setCourtName] = useState('Supreme Court of India');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(moment('1980-01-01'));
    const [endDate, setEndDate] = useState(moment('2024-01-01'));
    const [result, setResult] = useState();
    const [search] = useSearchParams();
    const { messageId, cases } = useSelector(state => state.gpt.relatedCases);
    const currentUser = useSelector(state => state.auth.user);

    async function handleCaseSearch(e) {
        try {
            e.preventDefault();
            setLoading(true)
            const response = await fetch(`${NODE_API_ENDPOINT}/gpt/case/search`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${currentUser.jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query, startDate: startDate.format("DD/MM/YYYY"), endDate: endDate.format("DD/MM/YYYY"), courtName })
            });
            const parsed = await response.json();
            setResult(parsed.data.result)
            console.log(parsed);
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false);
        }
    }
    console.log(startDate.format("DD/MM/YYYY"), endDate)
    return (
        <div style={{ width: "70%", margin: "auto", zIndex: 2, position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: 250 }}>
                    <div>Court:</div>
                    <FormControl fullWidth>
                        <Select
                            onChange={(e) => setCourtName(e.target.value)}
                            value={courtName}
                            sx={{ backgroundColor: "white" }}
                        >
                            <MenuItem value={"Supreme Court of India"}>Supreme Court</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: 500 }}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <div>From:</div>
                            <DatePicker value={startDate} onChange={(newVal) => setStartDate(newVal)} sx={{ backgroundColor: "white" }} />
                            <div>To:</div>
                            <DatePicker value={endDate} onChange={(newVal) => setEndDate(newVal)} sx={{ backgroundColor: "white" }} />
                        </LocalizationProvider>
                    </Box>
                </div>
            </div>
            <form onSubmit={handleCaseSearch} style={{ marginTop: 20, marginBottom: 25, display: "flex", backgroundColor: "white", padding: 16, borderRadius: 10 }}>
                <SearchOutlined style={{ color: "#777", paddingRight: 5 }} />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ width: "100%", fontSize: 16, outline: "none", border: "none" }}
                    placeholder='Enter Prompt Here ...'
                />
            </form>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {loading ? <div style={{ display: "flex", justifyContent: "center" }}> <CircularProgress style={{ color: "white" }} /></div>:<>
                    {result ? result.map((relatedCase) => {
                        return <CaseCard
                            caseId={relatedCase.id}
                            name={relatedCase.title}
                            citations={relatedCase.numCites}
                            court={relatedCase.court}
                            key={relatedCase.id}
                        />
                    }) : search.get('id') === messageId && cases.map((relatedCase) => {
                        return <CaseCard
                            caseId={relatedCase.id}
                            name={relatedCase.title}
                            citations={relatedCase.numCites}
                            date={relatedCase.date}
                            court={relatedCase.court}
                            key={relatedCase.id}
                        />
                    })}
                </>}
            </div>
        </div>
    )
}
