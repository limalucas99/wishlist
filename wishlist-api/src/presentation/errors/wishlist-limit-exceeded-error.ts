export class WishlistLimitExceededError extends Error {
  constructor() {
    super("Wishlist has reached the maximum limit of 20 products");
    this.name = "WishlistLimitExceededError";
  }
}
