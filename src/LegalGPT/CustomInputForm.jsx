import React, { useState } from 'react'

import SendIcon from '@mui/icons-material/Send';


export default function CustomInputForm({ onSubmit }) {
  const [query, setQuery] = useState("");
  function onFormSubmission(e){
    e.query = query;
    setQuery("");
    e.preventDefault();
    onSubmit(e);
    return;
  }
  return (
    <div style={{ backgroundColor: "transparent", width: "60%", margin: "auto", paddingTop: 50 }}>
      <form onSubmit={onFormSubmission} style={{ width: "100%", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.15)", backgroundColor: "rgba(255,255,255,0.05)", padding: 5, display: "flex" }}>
        <input
          placeholder='Type Your Legal Queries...'
          style={{ flex: 1, outline: "none", border: "none", backgroundColor: "transparent", color: "white" }}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button type='submit' style={{ border: "none", backgroundColor: "rgba(137, 64, 255, 0.7)", borderRadius: 10, padding: 10 }}>
          <SendIcon style={{ color: "white", backgroundColor: "transparent" }} />
        </button>
      </form>
    </div>
  )
}