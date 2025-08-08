import { wishlistPaths } from "./wishlist-paths";
import { components } from "./components";

export default {
  openapi: "3.0.0",
  info: {
    title: "Wishlist BFF API",
    version: "1.0.0",
    description: "Backend for Frontend for Wishlist with JWT authentication",
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "Wishlist",
      description: "Wishlist related operations",
    },
  ],
  paths: wishlistPaths,
  components,
};
