const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const renewalRoutes = require("./routes/renewalRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/renewals", renewalRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});