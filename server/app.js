import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { ConnectDB } from "./db/init.mjs";
import UserRoutes from "./routes/userRoutes.mjs"
import SongRoutes from "./routes/songRoutes.mjs"
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";
 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();
config({path:'./.env'})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/v1/", UserRoutes)
app.use("/api/v1/", SongRoutes)


ConnectDB()

export default app;
