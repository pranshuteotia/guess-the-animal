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
import { useDispatch, useTheme, useWon } from "src/state/index.js";
import { Moon, Sun } from "src/Icons/index.js";
import { applyMode, Mode } from "@cloudscape-design/global-styles";
import {
  setAnimal,
  setNextAnimal,
  setStatus,
  setTheme,
} from "src/state/reducer.js";

export const App = () => {
  const won = useWon();
  const theme = useTheme();
  const dispatch = useDispatch();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (won) {
      headerRef.current?.scrollIntoView(true);
      setTimeout(() => {
        dispatch(setStatus("CELEBRATE"));
      }, 200);
    }
  }, [won]);

  useEffect(() => {
    const theme = getThemeFromLocalStorage();
    applyMode(theme);
    dispatch(setTheme(theme));

    const searchParams = new URLSearchParams(window.location.search);
    const value = searchParams.get("animal");
    const animal = (
      getAnimalFromString(value) || getRandomAnimal()
    ).toLocaleLowerCase();

    dispatch(setAnimal(animal));
    dispatch(setNextAnimal(getRandomAnimal()));
  }, []);

  const toggleModeHandler = () => {
    const theme = isDarkModeEnabled() ? Mode.Light : Mode.Dark;
    setLocalStorage("theme", theme);
    applyMode(theme);
    dispatch(setTheme(theme));
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
                iconSvg={theme === Mode.Light ? <Moon /> : <Sun />}
                onClick={toggleModeHandler}
              />
            }
            variant="h1"
            info={
              <Popover
                position="bottom"
                triggerType="custom"
                header="How to play"
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
