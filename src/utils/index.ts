import { animals } from "src/animals.js";
import { DARK_MODE_CLASS_NAME } from "src/constants.js";

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
