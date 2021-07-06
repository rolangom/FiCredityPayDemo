
export interface IItem {
  id: number,
  title: string,
  description: string,
  price: number,
  currency: string,
  image: string,
  category: string,
  // qty: number,
}

export interface ICartItem {
  itemId: IItem['id'],
  qty: number,
}

