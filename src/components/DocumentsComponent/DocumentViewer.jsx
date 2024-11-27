import React, { useState } from "react";

import NDA from "../../assets/documents/NDA.png";
import IPA from "../../assets/documents/Intellectual Property Agreement.png";
import MOU from "../../assets/documents/Memorandum of Understanding.png";
import Vendor from "../../assets/documents/Vendor Agreement.png";
import Rent from "../../assets/documents/Rent Agreement.png";

const DocumentViewer = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const documents = [
    { id: 1, name: "Non-Disclosure Agreement (NDA)", image: NDA },
    { id: 2, name: "Intellectual Property Agreement", image: IPA },
    { id: 3, name: "Memorandum of Understanding", image: MOU },
    { id: 4, name: "Vendor Agreement", image: Vendor },
    { id: 5, name: "Rent Agreement", image: Rent },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
    
      <h1 className="text-xl text-center">Here are some of your </h1>
      <h1 className="text-2xl font-semibold mb-6 text-center 
             bg-gradient-to-r from-[#00DDE5] via-[#00C37B] to-[#ff1493] 
             bg-clip-text text-transparent"
        >
            Pre-Made Legal Document Samples
        </h1>

      
      <div className="flex flex-wrap justify-center mb-8 gap-y-4">
        {documents.map((doc, index) => (
          <button
            key={doc.id}
            className={`px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-all border  border-teal-400 ${
              index < 2
                ? "flex-[0_1_calc(40%-1rem)]" 
                : "flex-[0_1_calc(33%-1rem)]" 
            } mx-2`}
            onClick={() => setSelectedDocument(doc)}
          >
            {doc.name}
          </button>
        ))}
      </div>

      
      {selectedDocument && (
        <div className="relative bg-gray-800 text-white p-6 rounded-lg max-w-3xl mx-auto shadow-lg">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
            onClick={() => setSelectedDocument(null)}
          >
            ✕
          </button>

          
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">{selectedDocument.name}</h2>

           
            <div className="relative" style={{ height: "400px" }}>
              <img
                src={selectedDocument.image}
                alt={selectedDocument.name}
                className="w-full h-full object-cover rounded"
              />

              <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 rounded text-white p-4">
                <div className="absolute bottom-0 flex gap-32">
                  <p className="text-2xl font-bold">Want to Unlock Full Document?</p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all">
                    Visit ADIRA AI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;
