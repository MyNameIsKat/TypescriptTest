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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.update = exports.retrieve = exports.create = void 0;
const config_1 = require("../config/config");
const iol = __importStar(require("iol-packages"));
//crud
let crud = new iol.service(config_1.client);
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            TableName: config_1.db,
            Item: req.body
        };
        yield crud.create(params);
        res.send(iol.returnResponse(201, "Succesfully Created", params.Item));
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.create = create;
const retrieve = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            TableName: config_1.db,
            KeyConditionExpression: "#PK = :PK and begins_with(#SK, :SK)",
            ExpressionAttributeNames: {
                "#PK": "PK",
                "#SK": "SK"
            },
            ExpressionAttributeValues: {
                ":PK": req.params.PK,
                ":SK": req.params.SK
            }
        };
        const result = yield crud.fetch(params);
        res.send(iol.returnResponse(201, "Succesfully Retrieved", result));
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.retrieve = retrieve;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UpdateExpression, ExpressionAttributeValues } = iol.updateHandler(req.body);
        const params = {
            TableName: config_1.db,
            Key: {
                "PK": req.body.PK,
                "SK": req.body.SK
            },
            ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
            UpdateExpression: 'SET ' + UpdateExpression,
            ExpressionAttributeValues,
            ReturnValues: 'ALL_NEW'
        };
        const result = yield crud.update(params);
        res.send(iol.returnResponse(201, "Succesfully Updated", result));
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.update = update;
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            TableName: config_1.db,
            Key: {
                "PK": req.body.PK,
                "SK": req.body.SK
            },
            ReturnValues: 'ALL_OLD'
        };
        const result = yield crud.delete(params);
        res.send(iol.returnResponse(201, "Succesfully Delete", result));
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.del = del;
//# sourceMappingURL=controller.js.map