import { useRef, useEffect, useState } from 'react';
import { createStore } from 'polotno/model/store';

const POLONTO_API_KEY = '3gylZuBSeYiTZ7Oxwghd';

export const usePolonoStore = () => {
  const [store, setStore] = useState(
    createStore({ key: POLONTO_API_KEY, showCredit: true })
  );

  useEffect(() => {
    store.on('change', s => {
      console.log(s);
    });
  }, []);

  return store;
};
