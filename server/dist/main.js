"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = require("./utils/database");
const logger_1 = __importDefault(require("./utils/logger"));
const multer_1 = __importDefault(require("multer"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const auth_2 = require("./controllers/auth");
// Configurations
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use((0, morgan_1.default)('common'));
app.use(express_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use((0, cors_1.default)());
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'public/assets')));
// File Storage
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// Register route with upload function
app.post('/auth/register', upload.single('picture'), auth_2.register);
// Routes
app.use('/auth', auth_1.default);
app.use('/auth', user_1.default);
// Mongoose setup
const PORT = process.env.PORT || 6001;
const server = app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connectToDatabase)();
    logger_1.default.info(`Server Port: ${PORT}`);
}));
const signals = ['SIGTERM', 'SIGINT'];
function gracefulShutdown(signal) {
    process.on(signal, () => __awaiter(this, void 0, void 0, function* () {
        server.close();
        yield (0, database_1.disconnectFromDatabase)();
        // Disconnect from database connection
        logger_1.default.info('The work of the server is done!');
        process.exit(0);
    }));
}
for (let i = 0; i < signals.length; i++)
    gracefulShutdown(signals[i]);
//# sourceMappingURL=main.js.map