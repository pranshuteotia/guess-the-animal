import { Button, SpaceBetween } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { ConfettiExplosion } from "react-confetti-explosion";
import { useActionAreaStyles } from "src/ActionArea/styles.js";
import { animals } from "src/animals.js";
import {
  useAnimal,
  useCurrentGuess,
  useDispatch,
  useStatus,
} from "src/state/index.js";
import {
  setAnimal,
  setGuess,
  setStatus,
  setWonStatus,
} from "src/state/reducer.js";
import { getRandomAnimal } from "src/utils/index.js";

export const ActionArea = () => {
  const animal = useAnimal();
  const currentGuess = useCurrentGuess();
  const status = useStatus();
  const dispatch = useDispatch();

  const [celebrate, setCelebrate] = useState(false);
  const { confettiContainer } = useActionAreaStyles();

  useEffect(() => {
    setCelebrate(status === "CELEBRATE");
  }, [status]);

  const submitButtonHandler = () => {
    const [answers, secret] = animals[animal.current];
    if (answers.concat(secret).includes(currentGuess)) {
      dispatch(setWonStatus(true));
      dispatch(setGuess(""));
    } else {
      // Do nothing for now...
    }
  };

  const nextButtonHandler = () => {
    const newAnimal = getRandomAnimal();
    dispatch(setAnimal({ current: animal.next, next: newAnimal }));
    dispatch(setStatus("PLAY"));
  };

  const celebrationEndHandler = () => {
    dispatch(setWonStatus(false));
    dispatch(setStatus("PLAY"));
    dispatch(setAnimal({ current: animal.next, next: getRandomAnimal() }));
    setCelebrate(false);
  };

  const revealButtonHandler = () => {
    dispatch(setStatus("REVEAL"));
  };

  return (
    <>
      <SpaceBetween size="m" direction="vertical">
        <SpaceBetween size="s" direction="horizontal">
          <Button disabled={celebrate} onClick={nextButtonHandler}>
            Skip
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
        <div className={confettiContainer}>
          <ConfettiExplosion
            particleCount={250}
            force={0.6}
            portal={false}
            onComplete={celebrationEndHandler}
            zIndex={999}
          />
        </div>
      )}
    </>
  );
};
