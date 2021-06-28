"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const hbs_1 = __importDefault(require("hbs"));
const router_1 = __importDefault(require("./router/router"));
const app = express_1.default();
app.set('port', process.env.PORT || 7548);
// middlewares
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
// Static content
app.use(express_1.default.static('public'));
// Handlerbars
app.set('view engine', 'hbs');
// hbs.registerPartials( __dirname + '/views/partials');
// 
hbs_1.default.registerPartials(__dirname + '/views/partials');
// routes 
app.use(router_1.default);
exports.default = app;
