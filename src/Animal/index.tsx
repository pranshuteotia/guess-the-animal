import {
  Box,
  Header,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { animals } from "src/animals.js";
import { useImage } from "src/hooks/use-image.js";
import { useGlobalContext } from "src/state/index.js";
import { capitalize } from "src/utils/index.js";

export const Animal = () => {
  const {
    state: { animal, status },
  } = useGlobalContext();

  const { loading } = useImage(`${animal}.webp`);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  if (animal.length === 0) {
    return null;
  }

  return (
    <SpaceBetween size="s" direction="vertical">
      <div
        style={{
          width: 300,
          height: 300,
          background: "#d8d7d4",
          borderRadius: 8,
          position: "relative",
        }}
      >
        {!loading && (
          <img
            src={`./images/${animal}.webp`}
            alt={`Cartoonish ${animal}`}
            width={300}
            style={{ borderRadius: 8 }}
          />
        )}
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
            }}
          >
            <Spinner size="big" />
          </div>
        )}
      </div>
      <SpaceBetween direction="horizontal" size="xs" alignItems="end">
        <Header variant="h2">{capitalize(animal)}</Header>
        {status === "REVEAL" && (
          <Box>{`(${capitalize(animals[animal].join(","))})`}</Box>
        )}
      </SpaceBetween>
    </SpaceBetween>
  );
};
