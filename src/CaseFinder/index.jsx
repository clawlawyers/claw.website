import React, { useState } from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'


import { CaseCard } from '../components/CaseCard';
import { SearchOutlined } from '@mui/icons-material';

export default function CaseFinder() {
    const [court, setCourt] = useState('');
    const [query, setQuery] = useState('');
    return (
        <div style={{ width: "70%", margin: "auto", zIndex: 2, position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: 250 }}>
                    <div>Court:</div>
                    <FormControl fullWidth>
                        <InputLabel>Court</InputLabel>
                        <Select
                            sx={{ backgroundColor: "white" }}
                            onChange={(e) => setCourt(e.target.value)}
                            value={court}
                        >
                            <MenuItem value={"Bombay"}>Bombay</MenuItem>
                            <MenuItem value={"Delhi"}>Delhi</MenuItem>
                            <MenuItem value={"Punjab"}>Punjab</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: 250 }}>
                        <div>Date:</div>
                        <LocalizationProvider dateAdapter={AdapterMoment}>

                            <DatePicker sx={{ backgroundColor: "white" }} />
                        </LocalizationProvider>
                    </Box>
                </div>
            </div>
            <div style={{ marginTop: 20, marginBottom: 25, display: "flex", backgroundColor: "white", padding: 16, borderRadius: 10 }}>
                <SearchOutlined style={{ color: "#777", paddingRight: 5 }} />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ width: "100%", fontSize: 16, outline: "none", border: "none" }}
                    placeholder='Enter Prompt Here ...'
                />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                <CaseCard name="we good" court="abc" date="12 march 0001" citations={0} />
                <CaseCard name="we good" court="abc" date="12 march 0001" citations={0} />
                <CaseCard name="we good" court="abc" date="12 march 0001" citations={0} />
            </div>
        </div>
    )
}
