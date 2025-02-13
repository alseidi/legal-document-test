const path = require("path");

exports.uploadFile = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  console.log(req.file);

  res.json({
    fileName: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
    uploadDate: new Date().toISOString(),
  });
};

exports.getMockExtractions = (req, res) => {
  const extractions = Array.from({ length: 5 }, (_, i) => ({
    text: `Extraction ${i + 1}`,
    page: Math.floor(Math.random() * 10) + 1,
  }));
  res.json(extractions);
};
