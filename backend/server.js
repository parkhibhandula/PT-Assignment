import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error(" MongoDB connection failed", err);
    process.exit(1);
  });
