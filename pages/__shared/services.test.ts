import { describe, it } from "node:test";
import { connectAPI } from "./services";
import cy from "cypress";
describe("Test base service", () => {
  it("should return an object which has `Welcome to the StaffShare API`", async () => {
    const response = await connectAPI("/", "GET");
  });
});
