import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";

import Response from "./domain/response.js";
import logger from './util/logger.js';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3001;

const app = express();
// Every app can call this, shouldn't do normally, Normally should be array of strings
app.use(cors({ origin: "*" }));
// API info in json format
app.use(express.json());
app.get("/", (req, res) =>
  res.send(
    new Response(200, "OK", "Patient api, v1.0.0- All ystem ready", {
      patients: { name: "Andy" },
    })
  )
);
app.listen(PORT, () =>
  logger.info(`Server running on: ${ip.address()}: ${PORT}`)
);
