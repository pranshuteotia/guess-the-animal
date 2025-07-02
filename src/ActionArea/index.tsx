import { Button, SpaceBetween } from "@cloudscape-design/components";
import { useState } from "react";
import { ConfettiExplosion } from "react-confetti-explosion";
import { animals } from "src/animals.js";
import { useGlobalContext } from "src/state/index.js";
import { getRandomAnimal } from "src/utils/index.js";

export const ActionArea = () => {
  const {
    state: { animal, currentGuess },
    dispatch,
  } = useGlobalContext();

  const [celebrate, setCelebrate] = useState(false);

  const submitButtonHandler = () => {
    if (animals[animal].includes(currentGuess)) {
      setCelebrate(true);
      dispatch({ type: "SET_GUESS", payload: "" });
    } else {
      // Do nothing for now...
    }
  };

  const nextButtonHandler = () => {
    const newAnimal = getRandomAnimal();
    dispatch({ type: "SET_ANIMAL", payload: newAnimal });
  };

  const celebrationEndHandler = () => {
    dispatch({ type: "SET_ANIMAL", payload: getRandomAnimal() });
    setCelebrate(false);
  };

  return (
    <>
      <SpaceBetween size="m" direction="vertical">
        <SpaceBetween size="s" direction="horizontal">
          <Button onClick={nextButtonHandler}>Next</Button>
          <Button>Reveal</Button>
        </SpaceBetween>
        <Button
          disabled={celebrate}
          fullWidth
          variant="primary"
          onClick={submitButtonHandler}
        >
          Submit
        </Button>
      </SpaceBetween>
      {celebrate && (
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "50%",
          }}
        >
          <ConfettiExplosion
            particleCount={250}
            force={0.6}
            portal={false}
            onComplete={celebrationEndHandler}
          />
        </div>
      )}
    </>
  );
};
