import express from "express";
import serverlessExpress from "@codegenie/serverless-express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

import apolloserver from "./graphql";
import { createPaymentIntent } from "./stripe";

const isDev = process.env.ARC_ENV === "testing";

// * routers
const apiRouter = express.Router();
apolloserver.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
apiRouter.use("/graphql", expressMiddleware(apolloserver));
apiRouter.post("/create-payment-intent", createPaymentIntent);
apiRouter.get("/health", (req, res) => res.send("ok"));

// * api server
const app = express();
if (isDev) app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

exports.handler = serverlessExpress({ app });
