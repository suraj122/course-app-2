import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import appStore from "../utils/store/appStore";
import { BrowserRouter } from "react-router-dom";

describe("Navbar", () => {
  it("tests course login button is present in the document", () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    const login = screen.getByRole("button", { name: "Login" });

    expect(login).toBeInTheDocument();
  });

  it("tests course logout button is present in the document", () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    const signup = screen.getByText("signup");
    expect(signup).toBeInTheDocument();
  });

  it("should load two button inside the document", () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });
});
