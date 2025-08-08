const env = {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || "secret-jwt-key",
  wishlistApiUrl: process.env.WISHLIST_API_URL || "http://localhost:5050",
};

export default env;
