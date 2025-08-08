export interface RemoveProductFromWishlist {
  remove: (customerId: string, productId: string) => Promise<void>
}
