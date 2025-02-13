require("dotenv").config();
const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./src/routes/uploadRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded PDFs as static files
app.use("/uploads", express.static("uploads"));

app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
