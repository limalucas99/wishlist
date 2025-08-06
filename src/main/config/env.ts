import {
  DEFAULT_SERVER_PORT,
  DEFAULT_MONGO_URL,
  DEFAULT_MONGO_TEST_URL,
} from "./constants";

export default {
  mongoUrl: process.env.MONGO_URL ?? DEFAULT_MONGO_URL,
  port: Number(process.env.PORT) || DEFAULT_SERVER_PORT,
  mongoTestUrl: process.env.MONGO_TEST_URL ?? DEFAULT_MONGO_TEST_URL,
};
