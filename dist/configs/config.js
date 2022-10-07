"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env.NODE_ENV || 'dev'; // 'dev' or 'test'
const dev = {
    port: Number(process.env.PORT) || 3000
    // db: {
    //     // host: process.env.DEV_DB_HOST || 'localhost',
    //     // port: parseInt(process.env.DEV_DB_PORT) || 27017,
    //     // name: process.env.DEV_DB_NAME || 'db'
    // }
};
// const test = {
//     app: {
//         port: parseInt(process.env.TEST_APP_PORT) || 3000
//     },
//     db: {
//         host: process.env.TEST_DB_HOST || 'localhost',
//         port: parseInt(process.env.TEST_DB_PORT) || 27017,
//         name: process.env.TEST_DB_NAME || 'test'
//     }
// };
// const config = {
//     dev,
//     // test
// };
module.exports = dev;
//# sourceMappingURL=config.js.map