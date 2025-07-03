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
import { getRandomAnimal } from "src/utils/index.js";
import { useGlobalContext } from "src/state/index.js";

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
    dispatch({ type: "SET_ANIMAL", payload: getRandomAnimal() });
  }, []);

  return (
    <ContentLayout
      maxContentWidth={350}
      defaultPadding
      header={
        <div ref={headerRef}>
          <Header
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
