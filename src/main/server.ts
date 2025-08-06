import "dotenv/config";
import { MongoHelper } from "@/infra/db/mongodb/mongo-helper";
import env from "./config/env";

const DEFAULT_PORT = 3333;

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    console.log("Connected to MongoDB");
    const { default: app } = await import("./config/app");
    app.listen(env.port, () => {
      console.log(
        `Server running at http://localhost:${env.port || DEFAULT_PORT}`
      );
    });
  })
  .catch(console.error);
