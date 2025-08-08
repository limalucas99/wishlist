export const wishlistPaths = {
  "/api/v1/wishlist": {
    get: {
      tags: ["Wishlist"],
      summary: "List all products from customer's wishlist",
      description:
        "Returns a list with all products in the authenticated customer's wishlist",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Product list returned successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
        },
        401: {
          description: "Access token is required",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Invalid token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Wishlist"],
      summary: "Add a product to wishlist",
      description:
        "Adds a new product to the authenticated customer's wishlist",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Product",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Product added successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Product added to wishlist",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid data or product already exists",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        401: {
          description: "Access token is required",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Invalid token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/wishlist/{productId}": {
    get: {
      tags: ["Wishlist"],
      summary: "Check if a product is in the wishlist",
      description:
        "Checks if a specific product is in the authenticated customer's wishlist",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "productId",
          in: "path",
          required: true,
          description: "Product ID to be checked",
          schema: {
            type: "string",
            example: "64a7b8c9e1234567890abcde",
          },
        },
      ],
      responses: {
        200: {
          description: "Check completed successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CheckResponse",
              },
            },
          },
        },
        401: {
          description: "Access token is required",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Invalid token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Wishlist"],
      summary: "Remove a product from wishlist",
      description:
        "Removes a specific product from the authenticated customer's wishlist",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "productId",
          in: "path",
          required: true,
          description: "Product ID to be removed",
          schema: {
            type: "string",
            example: "64a7b8c9e1234567890abcde",
          },
        },
      ],
      responses: {
        200: {
          description: "Product removed successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Product removed from wishlist",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Access token is required",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Invalid token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        404: {
          description: "Product not found in wishlist",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
};
