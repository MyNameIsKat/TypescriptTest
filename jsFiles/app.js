"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
const requestErrorHandler_1 = require("./middlewares/requestErrorHandler");
const router_1 = __importDefault(require("./routers/router"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello Typescript Loans');
});
app.use('/loans', router_1.default);
(0, requestErrorHandler_1.ValidateRequest)(app);
app.listen(port, () => {
    return console.log(`listening at PORT ${port}`);
});
//# sourceMappingURL=app.js.map