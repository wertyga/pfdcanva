import { observe } from '@wertyga/wx';
import { AxiosInstance } from 'axios';
import { getGoogleFontsListAPI, getGoogleFontImage } from 'polotno/config';

import { actions } from '../components/HeaderActions/helpers';

export class GlobalStore {
  fetch: AxiosInstance;

  @observe('')
  activeTab: typeof actions[number]['text'];

  changeTab = (tab: typeof actions[number]['text']) => {
    this.activeTab = tab;
  };

  getFonts = async () => {
    // const dd = await import('polotno/config');
    // console.log(dd);
    // const url = getGoogleFontsListAPI();
    // console.log(url);
  };
}
