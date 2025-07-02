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
import { useEffect, useState } from "react";
import { getRandomAnimal } from "src/utils/index.js";
import { useGlobalContext } from "src/state/index.js";

export const App = () => {
  const { dispatch } = useGlobalContext();

  useEffect(() => {
    dispatch({ type: "SET_ANIMAL", payload: getRandomAnimal() });
  }, []);

  return (
    <ContentLayout
      maxContentWidth={350}
      defaultPadding
      header={
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
