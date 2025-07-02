import { getRandomAnimal } from "src/utils/index.js";
import { describe, expect, it } from "vitest";

describe("[utils] tests", () => {
  it("should return a random animal", () => {
    const randomAnimal = getRandomAnimal();

    expect(randomAnimal).toBeDefined();
  });
});
