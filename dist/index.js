"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const hbs_1 = __importDefault(require("hbs"));
const router_1 = __importDefault(require("./router/router"));
const typeorm_1 = require("typeorm");
const port = process.env.PORT || 3000;
const app = express_1.default();
typeorm_1.createConnection()
    .then(() => console.log('Connection success'))
    .catch(err => console.log('Connection err: ', err));
// Handlerbars
app.set('view engine', 'hbs');
// hbs.registerPartials( __dirname + '/views/partials');
// 
hbs_1.default.registerPartials(__dirname + '/views/partials');
// middlewares
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
// Static content
app.use(express_1.default.static('public'));
// routes 
app.use(router_1.default);
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
