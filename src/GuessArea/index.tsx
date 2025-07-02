import {
  Autosuggest,
  type AutosuggestProps,
  type NonCancelableCustomEvent,
} from "@cloudscape-design/components";
import type { BaseChangeDetail } from "node_modules/@cloudscape-design/components/input/interfaces.js";
import { useState } from "react";
import { useGlobalContext } from "src/state/index.js";
import { possibleGuesses } from "src/utils/index.js";

export const GuessArea = () => {
  const [options, setOptions] = useState<AutosuggestProps.Options>([]);
  const {
    dispatch,
    state: { currentGuess },
  } = useGlobalContext();

  const loadOptions = (searchTerm: string) => {
    const matchedAnimals = possibleGuesses.filter(
      (animal) => searchTerm.length > 0 && animal.includes(searchTerm)
    );
    setOptions(matchedAnimals.map((animal) => ({ value: animal })));
  };

  const onChangeHandler = (
    event: NonCancelableCustomEvent<BaseChangeDetail>
  ) => {
    const updatedSearchTerm = event.detail.value;
    loadOptions(updatedSearchTerm);
    dispatch({ type: "SET_GUESS", payload: updatedSearchTerm });
  };

  return (
    <Autosuggest
      onChange={onChangeHandler}
      value={currentGuess}
      filteringType="none"
      placeholder="Enter a guess"
      options={options}
    />
  );
};
