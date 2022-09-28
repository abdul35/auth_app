"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.get('/', (req, res) => {
    return res.send('Hello mother fucker!');
});
app.get('/h', (req, res) => {
    return res.send('omg!');
});
app.listen(PORT, () => {
    console.log(`Server has been started on http://localhost:${PORT}!`);
});
