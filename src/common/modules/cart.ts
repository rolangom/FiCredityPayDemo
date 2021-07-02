import { QueryClient, useQuery } from 'react-query';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ICartItem, IItem } from '../types';


interface ICartStore {
  cart: Record<string, number>,
  getLength(): number,
  add(it: ICartItem): void,
  remove(id: string): void,
}

function inmmutableMapDelete(map: Record<string, number>, key: string): Record<string, number> {
  const { [key]: _, ...rest } = map
  return rest;
}

function immutableMapSet(map: Record<string, number>, key: string, value: number): Record<string, number> {
  return {
    ...map,
    [key]: value,
  };
}

export const useCart = create<ICartStore>(persist(
  (set, get) => ({
    cart: {},
    getLength: () => Object.entries(get().cart).reduce((acc, [_, qty]) => acc + qty, 0),
    add: (it: ICartItem) => set(state => ({ cart: immutableMapSet(
        state.cart, 
        it.itemId,
        it.itemId in state.cart ? state.cart[it.itemId] + it.qty : it.qty
      ) 
    })),
    remove: (id: string) => set(state => ({ cart: inmmutableMapDelete(state.cart, id) })),
  }),
  {
    name: 'cart',
    getStorage: () => localStorage,
  }
));
