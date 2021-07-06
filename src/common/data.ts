import { IItem } from './types';

export const currency = 'USD';

const loremIpsom = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
  .replace(/,|./, '')
  .split(' ');

const randomWord = () => loremIpsom[Math.floor(Math.random() * loremIpsom.length)];

const getRandomWords = (n: number) => Array(n).fill(undefined).map(_ => randomWord()).join(' ');

// function buildRandomItem(): IItem {
//   const id = (Math.random() * Date.now()).toString(36)
//   return {
//     id,
//     title: getRandomWords(3),
//     description: getRandomWords(15),
//     price: Number((Math.random() * 99.99).toPrecision(2)),
//     image: `https://picsum.photos/seed/${id}/200/300`,
//     currency,
//   };
// }

// export const items: IItem[] = Array(100).fill(undefined).map(_ => buildRandomItem());

const timeout = <T extends any>(ms: number, value: T): Promise<T> =>
  new Promise<T>(resolve => setTimeout(resolve, ms, value));

export function fetchItems(): Promise<IItem[]> {
  return fetch('https://fakestoreapi.com/products')
    .then(resp => resp.json());
}
