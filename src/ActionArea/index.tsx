import { Button, SpaceBetween } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { ConfettiExplosion } from "react-confetti-explosion";
import { animals } from "src/animals.js";
import { useGlobalContext } from "src/state/index.js";
import { getRandomAnimal } from "src/utils/index.js";

export const ActionArea = () => {
  const {
    state: { animal, currentGuess, status },
    dispatch,
  } = useGlobalContext();

  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    setCelebrate(status === "CELEBRATE");
  }, [status]);

  const submitButtonHandler = () => {
    if (animals[animal].includes(currentGuess)) {
      dispatch({ type: "SET_WON", payload: true });
      dispatch({ type: "SET_GUESS", payload: "" });
    } else {
      // Do nothing for now...
    }
  };

  const nextButtonHandler = () => {
    const newAnimal = getRandomAnimal();
    dispatch({ type: "SET_ANIMAL", payload: newAnimal });
    dispatch({ type: "SET_STATUS", payload: "PLAY" });
  };

  const celebrationEndHandler = () => {
    dispatch({ type: "SET_WON", payload: false });
    dispatch({ type: "SET_STATUS", payload: "PLAY" });
    dispatch({ type: "SET_ANIMAL", payload: getRandomAnimal() });
    setCelebrate(false);
  };

  const revealButtonHandler = () => {
    dispatch({ type: "SET_STATUS", payload: "REVEAL" });
  };

  return (
    <>
      <SpaceBetween size="m" direction="vertical">
        <SpaceBetween size="s" direction="horizontal">
          <Button disabled={celebrate} onClick={nextButtonHandler}>
            Next
          </Button>
          <Button
            disabled={celebrate || status === "REVEAL"}
            onClick={revealButtonHandler}
          >
            Reveal
          </Button>
        </SpaceBetween>
        <Button
          loading={celebrate}
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
