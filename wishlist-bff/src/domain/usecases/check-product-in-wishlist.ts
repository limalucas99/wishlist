export interface CheckProductInWishlist {
  check: (customerId: string, productId: string) => Promise<boolean>;
}
