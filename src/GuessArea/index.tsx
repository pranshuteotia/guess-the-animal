import {
  Autosuggest,
  Checkbox,
  SpaceBetween,
  type AutosuggestProps,
  type CheckboxProps,
  type NonCancelableCustomEvent,
} from "@cloudscape-design/components";
import type { BaseChangeDetail } from "node_modules/@cloudscape-design/components/input/interfaces.js";
import { useState } from "react";
import { useGlobalContext } from "src/state/index.js";
import { getAnimalsThatMatchSearchTerm } from "src/utils/index.js";

export const GuessArea = () => {
  const [options, setOptions] = useState<AutosuggestProps.Options>([]);
  const [hardModeEnabled, setHardModeEnabled] = useState(false);
  const {
    dispatch,
    state: { currentGuess },
  } = useGlobalContext();

  const loadOptions = (searchTerm: string) => {
    if (hardModeEnabled) {
      setOptions([]);
      return;
    }

    const matchedAnimals = getAnimalsThatMatchSearchTerm(searchTerm);
    setOptions(matchedAnimals.map((animal) => ({ value: animal })));
  };

  const onChangeHandler = (
    event: NonCancelableCustomEvent<BaseChangeDetail>
  ) => {
    const updatedSearchTerm = event.detail.value.toLocaleLowerCase();
    loadOptions(updatedSearchTerm);
    dispatch({ type: "SET_GUESS", payload: updatedSearchTerm });
  };

  const hardModeCheckboxHandler = ({
    detail,
  }: NonCancelableCustomEvent<CheckboxProps.ChangeDetail>) => {
    setHardModeEnabled(detail.checked);
    dispatch({ type: "SET_MODE", payload: detail.checked ? "HARD" : "NORMAL" });
  };

  return (
    <SpaceBetween size="xs">
      <Checkbox onChange={hardModeCheckboxHandler} checked={hardModeEnabled}>
        Hard Mode
      </Checkbox>
      <Autosuggest
        onChange={onChangeHandler}
        value={currentGuess}
        filteringType="none"
        placeholder="Enter a guess"
        options={options}
        ariaLabel="Autosuggest example with no suggestions"
        empty="No matches found"
        enteredTextLabel={(value) => `Use: "${value}"`}
      />
    </SpaceBetween>
  );
};
