import express from "express";
import cors from "cors";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import vacationController from "./6-controllers/vacations-controller";
import authController from "./6-controllers/auth-controller";
import expressFileUpload from "express-fileupload"
import sanitize from "./3-middleware/sanitaze";
import expressRateLimit from "express-rate-limit";


const server = express();


server.use(cors());
server.use(express.json());
server.use("/api/", expressRateLimit({
    max: 100,
    windowMs: 100,
    message: "There is an error, try again later"
}))
server.use(sanitize);
server.use(expressFileUpload());
server.use("/api", vacationController);
server.use("/api", authController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on port ${appConfig.port}`));

