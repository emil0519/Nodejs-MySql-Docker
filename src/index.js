import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";

import Response from "./domain/response.js";
import log from "./util/logger.js";
import { HttpStatus } from "./controller/patinent.controller.js";
import patientRoutess from "./route/patient.route.js";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3001;

const app = express();
// Every app can call this, shouldn't do normally, Normally should be array of strings
app.use(cors({ origin: "*" }));
// API info in json format
app.use(express.json());
// actual route, if request going to / then going to app.get("/")
app.use('/patients',patientRoutess)
app.get("/", (req, res) =>
  res.send(
    new Response(
      HttpStatus.OK.code,
      HttpStatus.OK.status,
      "Patient api, v1.0.0- All ystem ready",
      {
        patients: { name: "Andy" },
      }
    )
  )
);
// app.all, any method get/post/put without matching above route
app.all("*", (req, res) =>
// if calling res without status, default status is 200
res.status(HttpStatus.NOT_FOUND).send(
  new Response(
    HttpStatus.NOT_FOUND.code,
    HttpStatus.NOT_FOUND.status,
    "Wrong route"
  )
)
);
app.listen(PORT, () => log.info(`Server running on: ${ip.address()}: ${PORT}`));
