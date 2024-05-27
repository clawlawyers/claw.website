import React, { useState } from 'react';
import Select from '@mui/material/Select';
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
import Styles from "./index.module.css";
import { SearchOutlined } from '@mui/icons-material';
import { NODE_API_ENDPOINT } from '../utils/utils';
import moment from 'moment';

export default function CaseFinder() {
    const [courtName, setCourtName] = useState('Supreme Court of India');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(moment('18-sep-01'));
    const [endDate, setEndDate] = useState(moment('19-sep-20'));
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
                body: JSON.stringify({ startDate: startDate.format("YY-MMM-DD'"), endDate: endDate.format("YY-MMM-DD'"),query, courtName })
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
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <div className={Styles.container} style={{ width: "80%", margin: "auto", zIndex: 2, position: "relative", paddingBottom: 60 }}>
                <div className={Styles.inputGrid}>
                    <Box>
                        <div>Court:</div>
                        <FormControl fullWidth>
                            <Select
                                onChange={(e) => setCourtName(e.target.value)}
                                value={courtName}
                                sx={{ backgroundColor: "white" }}
                            >
                                <MenuItem value="Supreme Court of India">Supreme Court</MenuItem>
                                <MenuItem value="Chattisgarh High Court">Chattisgarh High Court</MenuItem>
                                <MenuItem value="Sikkim High Court">Sikkim High Court</MenuItem>
                                <MenuItem value="Uttarakhand High Court">Uttarakhand High Court</MenuItem>
                                <MenuItem value="Calcutta High Court">Calcutta High Court</MenuItem>
                                <MenuItem value="Kerela High Court">Kerela High Court</MenuItem>
                                <MenuItem value="Karnataka High Court">Karnataka High Court</MenuItem>
                                <MenuItem value="Jammu and Kashmir High Court">Jammu and Kashmir High Court</MenuItem>
                                <MenuItem value="Jharkhand High Court">Jharkhand High Court</MenuItem>
                                <MenuItem value="Delhi High Court">Delhi High Court</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <div style={{ display: "flex", gap: 10 }}>
                        <div >
                            <div>From:</div>
                            <DatePicker slotProps={{ layout: { sx: { backgroundImage: "none", backgroundColor: "transparent" } } }} value={startDate} onChange={(newVal) => setStartDate(newVal)} sx={{ backgroundColor: "white" }} />
                        </div>
                        <div >
                            <div>To:</div>
                            <DatePicker value={endDate} onChange={(newVal) => setEndDate(newVal)} sx={{ backgroundColor: "white" }} />
                        </div>
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
                    {loading ? <div style={{ display: "flex", justifyContent: "center" }}> <CircularProgress style={{ color: "white" }} /></div> : <>
                        {result ? result.map((relatedCase) => {
                            return <CaseCard
                                caseId={relatedCase.case_id}
                                name={relatedCase.Title}
                                date={relatedCase.Date}
                                citations={relatedCase.num_cites}
                                court={relatedCase.court}
                                key={relatedCase.id}
                            />
                        }) : search.get('id') === messageId && cases.map((relatedCase) => {
                            return <CaseCard
                                caseId={relatedCase.case_id}
                                name={relatedCase.Title}
                                citations={relatedCase.num_cites}
                                date={relatedCase.Date}
                                court={relatedCase.court}
                                key={relatedCase.id}
                            />
                        })}
                    </>}
                </div>
            </div >
        </LocalizationProvider>
    )
}
