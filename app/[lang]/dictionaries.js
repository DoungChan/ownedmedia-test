import 'server-only'
 
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
}
 
export const getDictionary = async (locale) => {
  const dictionaryLoader = dictionaries[locale];
  if (typeof dictionaryLoader === 'function') {
    return dictionaryLoader();
  } else {
    throw new Error(`Dictionary for locale "${locale}" not found.`);
  }
}