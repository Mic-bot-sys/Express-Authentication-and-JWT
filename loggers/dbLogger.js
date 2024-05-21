const {transports, format, createLogger} = require("winston")
const winston = require("winston")
const path = require("path")

const dbLogger = createLogger({
    transports: [
        new transports.File({
            filename: path.join("logs", "dbConnectionInternalErrors.log"),
            level: "info",
            format: format.combine(
                format.errors({stack: true}),
                format.json(),
                format.timestamp(),
                format.prettyPrint(),
            ),
        })
    ],
    defaultMeta: {service: "DbService"}
})


module.exports = dbLogger