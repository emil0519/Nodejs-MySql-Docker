import express from "express";
import {
  getPatient,
  getPatients,
  creaetePatient,
  updatePatient,
  deletePatient,
} from "../controller/patinent.controller.js";

const patientRoutes = express.Router();

// route chaining, meaning route "/" can receive get request and execute getPatient function
// and receive post request for another functinon
patientRoutes.route("/").get(getPatients).post(creaetePatient);
// With id, this route provide getting particular patient, update and delete it
patientRoutes
  .route("/:id")
  .get(getPatient)
  .put(updatePatient)
  .delete(deletePatient);

export default patientRoutes;