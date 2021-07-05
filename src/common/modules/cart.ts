import { QueryClient, useQuery } from 'react-query';
import create, { StateCreator, SetState, GetState, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';
import { ICartItem, IItem } from '../types';


interface ICartStore {
  cart: Record<string, number>,
  getLength(): number,
  set(it: ICartItem): void,
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

// Log every time state is changed
const deleteItemWhen0Middleware = (config: StateCreator<ICartStore>) => (set: SetState<ICartStore>, get: GetState<ICartStore>, api: StoreApi<ICartStore>) => config(args => {
  console.log("  applying", args)
  set(args)
  console.log("  new state", get())
}, get, api)

export const useCart = create<ICartStore>(deleteItemWhen0Middleware(persist(
  (set, get) => ({
    cart: {},
    getLength: () => Object.entries(get().cart).reduce((acc, [_, qty]) => acc + qty, 0),
    set: (it: ICartItem) => it.qty === 0 ? get().remove(it.itemId) : set(state => ({ cart: immutableMapSet(state.cart, it.itemId, it.qty) })),
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
)));
