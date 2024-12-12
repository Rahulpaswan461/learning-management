require("dotenv").config();
const express = require("express");
const { checkForAuthenticateUser } = require("./middleware/authentication");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connection");
const userRoute = require("./routes/user");
const courseRoute = require("./routes/course");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectMongoDB(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is connected !!"))
  .catch(error => console.log("Error connecting to MongoDB:", error));

// Test route
app.get("/", (req, res) => res.send("From the server"));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticateUser("token"));

// Route handlers
app.use("/api/user", userRoute);
app.use("/api/course", courseRoute);

// Start the server
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
