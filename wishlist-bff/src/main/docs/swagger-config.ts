export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "Wishlist BFF API",
    description: "Backend for Frontend for Wishlist with JWT authentication",
    version: "1.0.0",
  },
  servers: [
    {
      url: "/api",
      description: "Main server",
    },
  ],
  tags: [
    {
      name: "Wishlist",
      description: "Customer wishlist related APIs",
    },
  ],
  paths: {
    "/wishlist": {
      get: {
        tags: ["Wishlist"],
        summary: "List wishlist products",
        description:
          "List all products in the authenticated customer's wishlist",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Product list returned successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/schemas/product" },
                },
              },
            },
          },
          401: { description: "Invalid or missing token" },
          500: { description: "Internal server error" },
        },
      },
      post: {
        tags: ["Wishlist"],
        summary: "Add product to wishlist",
        description: "Add a product to the authenticated customer's wishlist",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    description: "Product ID to be added",
                  },
                },
                required: ["productId"],
              },
            },
          },
        },
        responses: {
          201: { description: "Product added successfully" },
          400: { description: "Invalid data" },
          401: { description: "Invalid or missing token" },
          500: { description: "Internal server error" },
        },
      },
    },
    "/wishlist/{productId}": {
      get: {
        tags: ["Wishlist"],
        summary: "Check if product is in wishlist",
        description:
          "Check if a specific product is in the customer's wishlist",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "productId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Product ID to be checked",
          },
        ],
        responses: {
          200: {
            description: "Check completed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    exists: {
                      type: "boolean",
                      description:
                        "Indicates if the product is in the wishlist",
                    },
                  },
                },
              },
            },
          },
          401: { description: "Invalid or missing token" },
          500: { description: "Internal server error" },
        },
      },
      delete: {
        tags: ["Wishlist"],
        summary: "Remove product from wishlist",
        description:
          "Remove a product from the authenticated customer's wishlist",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "productId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Product ID to be removed",
          },
        ],
        responses: {
          200: { description: "Product removed successfully" },
          400: { description: "Invalid data" },
          401: { description: "Invalid or missing token" },
          500: { description: "Internal server error" },
        },
      },
    },
  },
  schemas: {
    product: {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        brand: { type: "string" },
        image: { type: "string" },
        price: { type: "number" },
        reviewScore: { type: "number" },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
