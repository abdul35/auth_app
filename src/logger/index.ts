import { createLogger, transports, format } from 'winston';

export const logger = createLogger({
    transports:
        [new transports.File({
            filename: 'logs/server.log',
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        }), new transports.Console()],
    format: format.combine(

        format.label({
            label: `Label`
        }),
        format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        format.printf(info => `[${info.level.toLocaleUpperCase()}] ${[info.timestamp]} - ${info.message}`),
    )
});