import database from "../../config/mysql.config.js";
import Response from "../domain/response.js";
import log from "../util/logger.js";
import { QUERY } from "../query/patient.query.js";

export const HttpStatus = {
  OK: { code: 200, status: "OK" },
  CREATED: { code: 201, status: "CREATED" },
  NO_CONTENT: { code: 204, status: "NO_CONTENT" },
  BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
  NOT_FOUND: { code: 404, status: "NOT_FOUND" },
  INTERAL_SERVER_ERROR: { code: 500, status: "INTERAL_SERVER_ERROR" },
};

export const getPatients = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, fetching patients`);
  database.query(QUERY.SELECT_PATIENTS, (error, results) => {
    if (!results) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "No patients found"
          )
        );
    } else {
      res.status(HttpStatus.OK.code).send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "Patients retrieved",
          {
            patients: results,
          }
        )
      );
    }
  });
};

export const creaetePatient = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, creating patient`);
  database.query(
    QUERY.CREATE_PATIENT,
    Object.values(req.body),
    (error, results) => {
      if (!results) {
        log.error(error.message);
        res
          .status(HttpStatus.INTERAL_SERVER_ERROR.code)
          .send(
            new Response(
              HttpStatus.INTERAL_SERVER_ERROR.code,
              HttpStatus.INTERAL_SERVER_ERROR.status,
              "Internal server error"
            )
          );
      } else {
        const patient = {
          id: results.insertedId,
          ...res.body,
          createdAt: new Date(),
        };
        res
          .status(HttpStatus.OK.code)
          .send(
            new Response(
              HttpStatus.CREATED.code,
              HttpStatus.CREATED.status,
              "Patient created",
              patient
            )
          );
      }
    }
  );
};

export const getPatient = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, fetching patient`);
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, result) => {
    // check if actual patient exist
    if (!result) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Patient ${req.params.id} was not found`
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "Patient retrieved",
            result[0]
          )
        );
    }
  });
};

export const updatePatient = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, fetching patient`);
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    // check if actual patient exist
    if (!result[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Patient ${req.params.id} was not found`
          )
        );
    } else {
      log.info(`Updating patient ${req.params.id}`);
      database.query(
        QUERY.UPDATE_PATIENT,
        [...Object.values(req.body), req.params.id],
        (error, results) => {
          if (!error) {
            res
              .status(HttpStatus.OK.code)
              .send(
                new Response(
                  HttpStatus.OK.code,
                  HttpStatus.OK.status,
                  "Patient updated",
                  { id: req.params.id, ...req.body }
                )
              );
          } else {
            log.error(error.message);
            res
              .status(HttpStatus.INTERAL_SERVER_ERROR.code)
              .send(
                new Response(
                  HttpStatus.INTERAL_SERVER_ERROR.code,
                  HttpStatus.INTERAL_SERVER_ERROR.status,
                  "Internal Server Error"
                )
              );
          }
        }
      );
    }
  });
};

export const deletePatient = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, deleting patient`);
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    // check if actual patient exist
    if (result.affectedRows > 0) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "Delete successful",
            results[0]
          )
        );
    } else {
      log.error(error.message);
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            // do not pass in server error message directly or else user will know which 
            // server you are using, just pass in customized message
            `Patient ${req.params.id} was not found`
          )
        );
    }
  });
};
