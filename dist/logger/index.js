"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
exports.logger = (0, winston_1.createLogger)({
    transports: [new winston_1.transports.File({
            filename: 'logs/server.log',
            format: winston_1.format.combine(winston_1.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), winston_1.format.align(), winston_1.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`))
        }), new winston_1.transports.Console()],
    format: winston_1.format.combine(winston_1.format.label({
        label: `Label`
    }), winston_1.format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss'
    }), winston_1.format.printf(info => `[${info.level.toLocaleUpperCase()}] ${[info.timestamp]} - ${info.message}`))
});
//# sourceMappingURL=index.js.map