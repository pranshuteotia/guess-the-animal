import { animals } from "src/animals.js";
import { DARK_MODE_CLASS_NAME } from "src/constants.js";
import fuzzy from "fuzzy";
import type { LocalStorageKey } from "src/types.js";
import { Mode } from "@cloudscape-design/global-styles";

const animalsInEnglish = Object.keys(animals);
export const possibleGuesses = Object.values(animals).reduce((acc, val) => {
  acc = acc.concat(val);
  return acc;
}, []);

export const getRandomAnimal = () => {
  const randomIndex = Math.floor(Math.random() * animalsInEnglish.length);
  return animalsInEnglish[randomIndex];
};

export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isDarkModeEnabled = () =>
  document.body.classList.contains(DARK_MODE_CLASS_NAME);

export const getAnimalFromString = (searchTerm?: string | null) => {
  if (!searchTerm) {
    return null;
  }

  return fuzzy.filter(searchTerm, animalsInEnglish)[0].original;
};

export const setLocalStorage = (key: LocalStorageKey, value: any) => {
  try {
    const serializedValue = JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
  } catch (e) {
    // Do nothing.
  }
};

export const getLocalStorage = (key: LocalStorageKey) => {
  try {
    const serializedValue = localStorage.getItem(key);

    if (!serializedValue) {
      return null;
    }
    return JSON.parse(serializedValue);
  } catch (e) {
    // Do nothing.
  }
};

export const getThemeFromLocalStorage = () => {
  const maybeTheme = getLocalStorage("theme");

  if (!maybeTheme) {
    return Mode.Light;
  }

  return maybeTheme as Mode;
};
