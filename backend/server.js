require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/utils/db");

const PORT = process.env.PORT || 5000;

// connect database
connectDB();

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


