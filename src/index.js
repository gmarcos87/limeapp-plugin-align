import  epics from './alignEpics';
import { reducer } from './alignReducer';
import * as selector from './alignSelectors';
import * as constants from './alignConstants';
import Page from './alignPage';
import { AlignMenu } from './alignMenu';

import i18nEs from '../i18n/translations/es.json';
import i18nEn from '../i18n/translations/en.json';

export default {
  name: 'Align',
  page: Page,
  menu: AlignMenu,
  store: {
    name: 'align',
    epics,
    reducer,
    selector,
    constants
  },
  translations: Object.assign(
    i18nEn,
    i18nEs
  )
};
