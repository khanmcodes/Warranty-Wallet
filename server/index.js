const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authRoutes")
const warrantyRoutes = require("./routes/warrantyRoutes")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["https://warranty-wallet.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err))

app.use("/api/auth", authRoutes);
app.use("/api/warranties", warrantyRoutes);

app.get("/", (req, res) => {
    res.send("WW Backend is running")
})

// app.listen(5000, () => console.log("Server is running on port 5000"))
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))