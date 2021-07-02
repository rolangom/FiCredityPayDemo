import { QueryClient, useQuery } from 'react-query';
import create from 'zustand';
import { IItem, ICartItem } from './types';
import { fetchItems } from './data';

export const queryClient = new QueryClient();

interface IBaseStore {
  cart: ICartItem[],
  push(it: ICartItem): void,
  update(it: ICartItem): void,
  remove(id: string): void,
}

export const useCart = create<IBaseStore>((set, get) => ({
  cart: [],
  push: (it: ICartItem) => set(state => ({ cart: state.cart.concat(it) })),
  update: (newit: ICartItem) => set(state => ({ cart: state.cart.map(it => it.itemId === newit.itemId ? newit : it) })),
  remove: (id: string) => set(state => ({ cart: state.cart.filter(it => it.itemId !== id) })),
}));
