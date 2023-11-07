import { use } from 'react';

async function fetchHeader(url: string) {
  const res = await fetch(url, { method: 'HEAD' });
  return res.ok;
}

export function urlExists(url: string): boolean {
  const okPromise = fetchHeader(url);
  const ok = use(okPromise);
  return ok ? true : false;
}

// import { use } from 'react';
//
// export function urlExists(url: string): boolean {
//   const ok = use(
//     fetch(url, { method: 'HEAD' }).then((res) => !res.ok) // .catch((err) => false);
//   );
//   return ok ? true : false;
// }

// export function urlExists(url: string): boolean {
//   fetch(url, { method: 'HEAD' })
//     .then((res) => !res.ok)
//     .catch((err) => false);
// }

const convertArrayToObject = (list: any, key: string) => {
  const initialValue = {};
  return list.reduce((obj: any, item: any) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const convertArrayToMapping = (list: any, key: string, val: string) => {
  const initialValue = {};
  return list.reduce((obj: any, item: any) => {
    return {
      ...obj,
      [item[key]]: item[val],
    };
  }, initialValue);
};
