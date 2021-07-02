
export interface IItem {
  id: string,
  title: string,
  descr: string,
  price: number,
  currency: string,
  photoURL: string,
  // qty: number,
}

export interface ICartItem {
  itemId: string,
  qty: number,
}

