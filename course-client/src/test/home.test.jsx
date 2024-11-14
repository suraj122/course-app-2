import { render, screen } from "../utils/test.utils";
import { expect, it } from "vitest";
import Home from "../components/Home";

it("Should tests welcome to course selling app is in the document", () => {
  render(<Home />);
  const text = screen.getByText("Welcome to Course selling App");
  expect(text).toBeInTheDocument();
});
