const expressWinston = require("express-winston")
const {transports, format} = require("winston")
const path = require("path")


const requestLogger = expressWinston.logger({
    transports: [
        new transports.File({filename: path.join("logs", "logWarnings.log"), level: "info"}),
        new transports.File({filename: path.join("logs", "logErrors.log"), level: "error"})
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    ),
    statusLevels: true
})


module.exports = requestLogger