import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../styles.css";

Modal.setAppElement("#root");

const base_url = process.env.REACT_APP_BASE_URL

const UploadModal = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  // Close the model and clear errors and file
  const handleClose = () => {
    onClose();
    setFile(null);
    setError("");
  };

  // Uploading file handler function
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${base_url}/api/upload`,
        formData
      );
      onSuccess(res.data); // Pass uploaded file data
      handleClose(); // Close the modal
    } catch (err) {
      setError("Upload failed. Try again.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="upload-modal"
    >
      <h2>Upload PDF Document</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="upload-input"
      />
      {error && <p className="error-text">{error}</p>}
      <div className="upload-actions">
        <button onClick={handleUpload} className="upload-button">
          Upload
        </button>
        <button onClick={handleClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default UploadModal;
