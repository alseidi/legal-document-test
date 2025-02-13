const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { uploadFile, getMockExtractions } = require("../controllers/uploadController");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/extractions/:documentId", getMockExtractions);

module.exports = router;
