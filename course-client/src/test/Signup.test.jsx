import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Signup from "../components/Signup";
import { Provider } from "react-redux";
import appStore from "../utils/store/appStore";
import { BrowserRouter } from "react-router-dom";

describe("Signup Form testing", () => {
  it("should load two inputs in the document", () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );
    const inputBoxes = screen.getAllByRole("textbox");
    expect(inputBoxes.length).toBe(1);
  });
  it("should load signup button in the document", () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );
    const signup = screen.getByRole("button", { name: "Signup" });
    expect(signup).toBeInTheDocument();
  });
});
