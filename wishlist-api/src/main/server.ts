import "dotenv/config";
import { MongoHelper } from "@/infra/db/mongodb/mongo-helper";
import env from "./config/env";
import { DEFAULT_SERVER_PORT } from "./config/constants";

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    console.log("Connected to MongoDB");
    const { default: app } = await import("./config/app");
    app.listen(env.port, () => {
      console.log(
        `Server running at http://localhost:${env.port || DEFAULT_SERVER_PORT}`
      );
    });
  })
  .catch(console.error);
