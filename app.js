"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var connectdb_js_1 = __importDefault(require("./config/connectdb.js"));
var userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
var mongoose = require("mongoose");
var app = express_1.default();
var port = process.env.PORT;
var DATABASE_URL = process.env.DATABASE_URL;
// CORS Policy
app.use(cors_1.default());
// Database Connection
connectdb_js_1.default(DATABASE_URL);
// JSON
app.use(express_1.default.json());
// Load Routes
app.use("/api/user", userRoutes_js_1.default);
app.listen(port, function () {
    console.log("Server Listening at http://localhost:" + port);
});
