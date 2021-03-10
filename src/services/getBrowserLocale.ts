import { getUserLocales } from 'get-user-locale';

export const getBrowserLocale = () => getUserLocales()[0];
