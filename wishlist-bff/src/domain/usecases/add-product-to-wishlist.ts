export interface AddProductToWishlist {
  add: (customerId: string, productId: string) => Promise<void>;
}
