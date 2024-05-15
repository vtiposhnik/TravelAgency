"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const tour_route_1 = __importDefault(require("./routes/tour.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Middlewares
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client')));
// MongoDB
if (process.env.MONGO_DB_URI) {
    mongoose_1.default.connect(process.env.MONGO_DB_URI)
        .then(() => {
        console.log("MongoDB connected successfully!");
    })
        .catch((error) => {
        console.log(error);
    });
}
else {
    console.log('environment variable is undefined!');
}
app.get('/', (req, res) => {
    res.json({ message: 'сервер запущен' });
});
// Routes
app.use('/api/auth', auth_route_1.default);
app.use('/api/tour', tour_route_1.default);
app.use('/api/user', user_route_1.default);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
