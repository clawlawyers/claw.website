import React, { useState } from "react";
import Intell from "../../assets/Intell.png";
import Memo from "../../assets/memorand.png";
import Non from "../../assets/Nondesclosure.png";
import Vendor from "../../assets/vendor.png";
import Rent from "../../assets/rental.png";
import { Close } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

const DocumentViewer = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const documents = [
    { id: 1, name: "Non-Disclosure Agreement (NDA)", image: Non },
    { id: 2, name: "Intellectual Property Agreement", image: Intell },
    { id: 3, name: "Memorandum of Understanding", image: Memo },
    { id: 4, name: "Vendor Agreement", image: Vendor },
    { id: 5, name: "Rent Agreement", image: Rent },
  ];

  const handleDocumentClick = (doc) => {
    setLoading(true);
    setSelectedDocument(null);
    setTimeout(() => {
      setSelectedDocument(doc);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="pt-20 w-[80%] bg-gray-900 bg-transparent text-white m-auto flex flex-col gap-3">
      <div>
        <h1 className="text-3xl font-semibold text-center">
          Here are some of your{" "}
        </h1>
        <h3
          className="w-full text-center"
          style={{
            background: "linear-gradient(rgb(0, 128, 128), rgb(0, 200, 128))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            fontSize: "3rem",
            fontWeight: "700",
            display: "inline-block",
          }}
        >
          Pre-Made Legal Document Samples
        </h3>
      </div>
      <div className="flex flex-wrap justify-center mb-8 gap-y-4">
        {documents.map((doc, index) => (
          <button
            key={doc.id}
            style={{ border: "2px solid rgb(0, 200, 128)" }}
            className={`w-[300px] mx-1 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-all`}
            onClick={() => handleDocumentClick(doc)}
          >
            {doc.name}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center h-96 w-[90%] bg-black mx-auto">
          <CircularProgress size={50} color="inherit" />
        </div>
      )}

      {selectedDocument && !loading && (
        <div className="relative bg-black opacity-80 text-white p-6 rounded-lg md:w-[90%] mx-auto shadow-lg">
          <Close
            onClick={() => setSelectedDocument(null)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white cursor-pointer"
          />
          <div className="text-center">
            <h2 className="text-xl font-bold mb-8">{selectedDocument.name}</h2>
            <div className="relative" style={{ height: "600px" }}>
              <div className="absolute flex justify-center bottom-0 inset-0 bg-gradient-to-t from-black via-black/80 to-black/10 rounded text-white p-4">
                <div className="absolute  bottom-0 flex flex-col md:flex-row items-center gap-2 md:gap-32">
                  <p className="text-2xl font-bold m-0">
                    Want to Unlock Full Document?
                  </p>
                  <button className="px-4 py-2 text-white rounded hover:bg-opacity-25 transition-all">
                    Visit ADIRA AI
                  </button>
                </div>
              </div>
              <img
                src={selectedDocument.image}
                alt={selectedDocument.name}
                className="w-full h-full rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;
