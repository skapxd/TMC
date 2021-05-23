"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db/db");
db_1.createConnection();
app_1.default.listen(app_1.default.get('port'), () => {
    console.log(`Server at http://localhost:${app_1.default.get('port')}`);
});
