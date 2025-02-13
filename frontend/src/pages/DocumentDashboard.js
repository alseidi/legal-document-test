import React, { useState } from "react";
import UploadModal from "../components/UploadModal";
import DocumentDetailsModal from "../components/DocumentDetailsModal";

const DocumentDashboard = () => {
  const [documents, setDocuments] = useState(Array(9).fill(null));
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleUploadSuccess = (index, fileData) => {
    const newDocs = [...documents];
    newDocs[index] = {
      fileName: fileData.fileName,
      filePath: fileData.filePath,
      uploadDate: fileData.uploadDate,
    };
    setDocuments(newDocs);
    setUploadModalOpen(false);
  };

  return (
    <div className="dashboard">
      {documents.map((doc, index) => (
        <div
          key={index}
          className="document-box"
          onClick={() => {
            setSelectedIndex(index);
            if (doc) {
              setSelectedDoc(doc);
              setDetailsModalOpen(true);
            } else {
              setUploadModalOpen(true);
            }
          }}
        >
          <p>{`Legal Document ${index + 1}`}</p>
          <div>
            <small>
              Uploaded On:{" "}
              {doc && new Date(doc.uploadDate).toLocaleDateString()}
            </small>
            <br />
            <small>File name: {doc && doc.fileName}</small>
          </div>
        </div>
      ))}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSuccess={(fileData) => handleUploadSuccess(selectedIndex, fileData)}
      />
      <DocumentDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        document={selectedDoc}
      />
    </div>
  );
};

export default DocumentDashboard;
