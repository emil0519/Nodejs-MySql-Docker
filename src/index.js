import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3001;

const app = express();
// Every app can call this, shouldn't do normally, Normally should be array of strings
app.use(cors({ origin: "*" }));
// API info in json format
app.use(express.json());
app.get("/", (req, res) => {
  res.send({ message: "Server running" });
});
console.log(process.env,'process.env');
app.listen(PORT, ()=> console.log(`Server running on: ${ip.address()}: ${PORT}`))
