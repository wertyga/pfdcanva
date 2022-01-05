import { useStores as useWxStores } from '@wertyga/wx';
import { RootStore } from '../types';

export const useStore = (
  dependencies?: Array<keyof RootStore['globalStore']>
): RootStore['globalStore'] => {
  return useWxStores<RootStore, RootStore['globalStore']>(
    'globalStore',
    dependencies
  ).globalStore;
};
