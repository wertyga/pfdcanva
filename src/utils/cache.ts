import Cache from 'lru-cache';

let cache: typeof Cache;

export const getCache = () => {
  if (!cache && typeof window === 'undefined') {
    cache = new Cache({
      maxAge: 1000 * 60 * 60,
    });
  }
  return cache;
};
