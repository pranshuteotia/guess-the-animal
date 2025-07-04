import {
  Box,
  Button,
  Container,
  ContentLayout,
  Header,
  Popover,
  SpaceBetween,
} from "@cloudscape-design/components";
import { GuessArea } from "src/GuessArea/index.js";
import { Animal } from "src/Animal/index.js";
import { ActionArea } from "src/ActionArea/index.js";
import { useEffect, useRef } from "react";
import {
  getAnimalFromString,
  getRandomAnimal,
  getThemeFromLocalStorage,
  isDarkModeEnabled,
  setLocalStorage,
} from "src/utils/index.js";
import { useGlobalContext } from "src/state/index.js";
import { Moon } from "src/Icons/index.js";
import { applyMode, Mode } from "@cloudscape-design/global-styles";

export const App = () => {
  const {
    dispatch,
    state: { won },
  } = useGlobalContext();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (won) {
      headerRef.current?.scrollIntoView(true);
      setTimeout(() => {
        dispatch({ type: "SET_STATUS", payload: "CELEBRATE" });
      }, 200);
    }
  }, [won]);

  useEffect(() => {
    const theme = getThemeFromLocalStorage();
    applyMode(theme);

    const searchParams = new URLSearchParams(window.location.search);
    const value = searchParams.get("animal");
    const animal = (
      getAnimalFromString(value) || getRandomAnimal()
    ).toLocaleLowerCase();

    dispatch({ type: "SET_ANIMAL", payload: animal });
  }, []);

  const toggleModeHandler = () => {
    const theme = isDarkModeEnabled() ? Mode.Light : Mode.Dark;
    setLocalStorage("theme", theme);
    applyMode(theme);
  };

  return (
    <ContentLayout
      maxContentWidth={350}
      defaultPadding
      header={
        <div ref={headerRef}>
          <Header
            actions={
              <Button
                variant="icon"
                iconSvg={<Moon />}
                onClick={toggleModeHandler}
              />
            }
            variant="h1"
            info={
              <Popover
                position="bottom"
                triggerType="custom"
                content={
                  <Box>Guess the hindi name of the animal displayed below.</Box>
                }
              >
                <Button variant="inline-link">Rules</Button>
              </Popover>
            }
          >
            Guess the Animal
          </Header>
        </div>
      }
    >
      <Container>
        <SpaceBetween size="xl" direction="vertical">
          <Animal />
          <GuessArea />
          <ActionArea />
        </SpaceBetween>
      </Container>
    </ContentLayout>
  );
};
