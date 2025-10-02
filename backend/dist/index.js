"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const _dirname = path_1.default.resolve();
app.use(express_1.default.json());
const port = config_1.config_port;
app.get('/index', (req, res) => {
    res.send('Testing the page to see if its working');
});
app.use('/api/v1/auth', auth_route_1.default);
const startServer = () => {
    console.log('checking if its connected ');
    app.listen(port, () => {
        console.log(`server is listening at http://localhost:${port}`);
    });
};
//make ready for depolyment
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
    app.get(/.*/, (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../frontend', 'dist', 'index.html'));
    });
}
startServer();
