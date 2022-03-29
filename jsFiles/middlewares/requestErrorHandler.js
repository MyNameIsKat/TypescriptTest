"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequest = void 0;
const ValidateRequest = (app) => {
    app.use((err, req, res, next) => {
        if (err && err.type) {
            const { details } = err.error;
            const e = [];
            details.map((errors) => {
                e.push(errors.message.replace(/"/g, ''));
            });
            res.status(400).json({ error: e });
        }
        else {
            res.status(500).end('internal server error');
        }
    });
};
exports.ValidateRequest = ValidateRequest;
//# sourceMappingURL=requestErrorHandler.js.map