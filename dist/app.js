"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const apiRouter_1 = require("./routers/apiRouter");
const config_1 = require("./configs/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(apiRouter_1.apiRouter);
app.listen(config_1.config.PORT, async () => {
    console.log('Server has started!!!');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('DB connected');
        }
    }
    catch (err) {
        if (err) {
            console.error(err);
        }
    }
});
//# sourceMappingURL=app.js.map