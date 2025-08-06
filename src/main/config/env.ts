const DEFAULT_PORT = 3000;

export default {
  mongoUrl: process.env.MONGO_URL ?? "mongodb://localhost:27017/wishlist",
  port: Number(process.env.PORT) || DEFAULT_PORT,
};
