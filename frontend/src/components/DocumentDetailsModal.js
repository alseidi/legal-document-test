import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "../styles.css"; // ✅ Import styles

// ✅ Set correct worker path
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

Modal.setAppElement("#root");

const base_url = process.env.REACT_APP_BASE_URL

const DocumentDetailsModal = ({ isOpen, onClose, document }) => {
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [extractions, setExtractions] = useState([]);

    useEffect(() => {
        if (document && document.fileName) {
            axios.get(`${base_url}/api/extractions/${document.fileName}`)
                .then((response) => setExtractions(response.data))
                .catch((error) => console.error("Error fetching extractions:", error));
        }

        console.log("Baase url", process.env)
    }, [document]);

    // Prevent invalid page navigation
    const goToPage = (page) => {
        if (page >= 1 && page <= numPages) {
            setCurrentPage(page);
        } else {
            console.warn(`Invalid page request: Page ${page} does not exist.`);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
            <h2>{document?.fileName || "Document Details"}</h2>
            <button onClick={onClose} className="close-button">X</button>

            <div className="pdf-container">
                {/* PDF Preview Panel */}
                <div className="pdf-preview">
                    {document?.filePath ? (
                        <Document
                            file={`${base_url}${document.filePath}`} 
                            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        >
                            <Page pageNumber={currentPage} />
                        </Document>
                    ) : (
                        <p style={{ color: "red" }}>Failed to load PDF file.</p>
                    )}
                </div>

                {/* Extraction Panel */}
                <div className="extraction-panel">
                    <h3>Extractions</h3>
                    {extractions.length > 0 ? (
                        extractions.map((extract, index) => (
                            <div 
                                key={index} 
                                className="extraction-item" 
                                onClick={() => goToPage(extract.page)}
                                style={{
                                    backgroundColor: extract.page > numPages ? "#ffdddd" : "#e9ecef",
                                    cursor: extract.page > numPages ? "not-allowed" : "pointer",
                                }}
                            >
                                <span>
                                    {extract.text} - Page {extract.page}
                                </span>
                                <button disabled={extract.page > numPages}>
                                    {extract.page > numPages ? "Invalid Page" : "Go To Page"}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Loading extractions...</p>
                    )}
                </div>
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {numPages}</span>
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === numPages}>
                    Next
                </button>
            </div>
        </Modal>
    );
};

export default DocumentDetailsModal;
