import express from "express";
import mongoose from "mongoose";
import expressConfig from "./framework/webserver/express.js";
import config from "./config/config.js";
import Connection from "./framework/database/mongoDb/Connection.js";
import serverConfig from "./framework/webserver/server.js";
import routes from "./framework/webserver/routes/routes.js";

const app = express();
// express.js configuration (middleware etc.)
expressConfig(app);
// server configuration and start
Connection(mongoose,config).connectToMongo();

// routes for each endpoint
routes(app, express);

serverConfig(app, config).startServer(); 

export default app;
