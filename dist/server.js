"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const upload_1 = __importDefault(require("./config/upload"));
const data_source_1 = __importDefault(require("./data-source"));
const AppError_1 = __importDefault(require("./errors/AppError"));
const routes_1 = __importDefault(require("./routes")); // routes é um Middleware
data_source_1.default.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/files', express_1.default.static(upload_1.default.directory));
    app.use(routes_1.default);
    app.use((err, request, response, _) => {
        if (err instanceof AppError_1.default) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }
        console.log(err);
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    });
    app.listen(process.env.PORT, () => {
        console.log('🚀 Server started 3333!');
    });
});
