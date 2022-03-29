"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const router = express.Router();
//refer to the controllers
const controller = __importStar(require("../controllers/controller"));
//refer to the middleware
const validateReqLoans_1 = require("../middlewares/validateReqLoans");
//Create
router.post("/create", validateReqLoans_1.validator.body(validateReqLoans_1.schemaTest), controller.create);
//Create
router.get("/retrieve/:PK", controller.retrieve);
//Create
router.put("/update", validateReqLoans_1.validator.body(validateReqLoans_1.schemaTest), controller.update);
//Create
router.delete("/delete", validateReqLoans_1.validator.body(validateReqLoans_1.schemaTest), controller.del);
exports.default = router;
//# sourceMappingURL=router.js.map