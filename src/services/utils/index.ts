import _queryString from 'query-string';
import { useEffect, useRef } from 'react';
import { Sort } from '../interfaces/Sort';
import { useIsomorphicLayoutEffect } from 'usehooks-ts'

export const queryString = {
  ..._queryString,
  stringify: ({ 
    sort, 
    ...query 
  } : { 
    sort?: Sort;
    [key: string]: any;
  }): string => {
      let str = _queryString.stringify(query);
      if (sort) {
        str += '&sort=' + sort.name + ',' + sort.order;
      }
      return str;
    } 
  };

export const numberWithCommas = (num: number | string | undefined): string => {
  if (!num) {
    return '0';
  }
  if (typeof num === 'number') {
    num = num.toString();
  }
  num = num.replace(/[^0-9]/g, "");
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const removeCommas = (num: string) => parseInt(num.toString().replace(/[^0-9]/g, ""));

export const validateNickname = (nickname: string): boolean => 
  nickname.length > 1 && /^([a-zA-Z0-9가-힣\s]){2,15}$/.test(nickname);

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback])

  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay])
}