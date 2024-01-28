import logger from "pino";
// why use logger?
// config logger, optional
const log = logger({
  base: { pid: false },
  transport: {
    // make log prettier
    target: "pino-pretty",
    options: {
      colorized: true,
    },
  },
  timestamp: () => `, "time": ${new Date().toLocaleString()}`,
});

export default log;
