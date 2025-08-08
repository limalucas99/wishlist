export const components = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      description: "JWT token obtained from authentication endpoint",
    },
  },
  schemas: {
    Product: {
      type: "object",
      properties: {
        productId: {
          type: "string",
          description: "Unique product identifier",
          example: "64a7b8c9e1234567890abcde",
        },
      },
      required: ["productId"],
    },
    Error: {
      type: "object",
      properties: {
        error: {
          type: "string",
          description: "Error message",
        },
      },
    },
    CheckResponse: {
      type: "object",
      properties: {
        exists: {
          type: "boolean",
          description: "Indicates if the product exists in the wishlist",
        },
      },
    },
  },
};
