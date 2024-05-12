import express from "express";
import serverlessExpress from "@codegenie/serverless-express";
import cors from "cors";

import apolloServer from "./graphql";
import stripeRouter from "./stripe";

const isDev = process.env.ARC_ENV === "testing";

// * routers
const apiRouter = express.Router();
apiRouter.use("/graphql", apolloServer);
apiRouter.use("/create-payment-intent", stripeRouter);
apiRouter.get("/health", (req, res) => res.send("ok"));

// * api server
const app = express();
if (isDev) app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

exports.handler = serverlessExpress({ app });
