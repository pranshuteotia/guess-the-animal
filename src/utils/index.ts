import { animals } from "src/animals.js";
import { DARK_MODE_CLASS_NAME } from "src/constants.js";
import fuzzy from "fuzzy";
import type { LocalStorageKey, Nullable } from "src/types.js";
import { Mode } from "@cloudscape-design/global-styles";

let animalNameGenerator: Generator<string, never, void>;

const animalsInEnglish = Object.keys(animals);
const possibleGuesses: string[] = Object.values(animals).reduce<string[]>(
  (acc, [val]) => {
    acc = acc.concat(val);
    return acc;
  },
  []
);

export const getRandomAnimal = (): string => {
  const randomIndex = random(0, animalsInEnglish.length);
  return animalsInEnglish[randomIndex];
};

export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isDarkModeEnabled = (): boolean =>
  document.body.classList.contains(DARK_MODE_CLASS_NAME);

export const getAnimalFromString = (
  searchTerm?: Nullable<string>
): Nullable<string> => {
  if (!searchTerm) {
    return null;
  }

  return fuzzy.filter(searchTerm, animalsInEnglish)[0].original;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray: T[] = [...array];

  for (let i = shuffledArray.length - 1; i > 0; --i) {
    const j = random(0, i + 1);
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

export function* createAnimalNameGenerator(
  names = animalsInEnglish
): Generator<string, never, void> {
  const shuffled = shuffleArray(names);
  let index = 0;
  console.log("DEBUG", shuffled);

  while (true) {
    yield shuffled[index];
    index = (index + 1) % shuffled.length;
  }
}

export const getAnimalNameGenerator = () => {
  if (!animalNameGenerator) {
    animalNameGenerator = createAnimalNameGenerator();
  }

  return animalNameGenerator;
};

export const getAnimalsThatMatchSearchTerm = (searchTerm: string): string[] => {
  if (searchTerm.length === 0) {
    return [];
  }

  const matchedAnimals = fuzzy.filter(searchTerm, possibleGuesses);

  return matchedAnimals.map((matchedAnimal) => matchedAnimal.original);
};

export const setLocalStorage = (key: LocalStorageKey, value: unknown) => {
  try {
    const serializedValue = JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
  } catch (e) {
    console.error(e);
  }
};

export const getLocalStorage = (key: LocalStorageKey): unknown => {
  try {
    const serializedValue = localStorage.getItem(key);

    if (!serializedValue) {
      return null;
    }
    return JSON.parse(serializedValue);
  } catch (e) {
    console.error(e);
  }
};

export const getThemeFromLocalStorage = () => {
  const maybeTheme = getLocalStorage("theme");

  if (!maybeTheme) {
    return Mode.Light;
  }

  return maybeTheme as Mode;
};

const random = (a: number, b: number): number => {
  return Math.floor(Math.random() * (b - a) + a);
};
