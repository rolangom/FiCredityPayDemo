import { QueryClient, useQuery } from 'react-query';
import { IItem } from '../types';
import { fetchItems } from '../data';

export function useItems() {
  return useQuery('items', () => fetchItems());
}

export function useItem(id: string) {

}