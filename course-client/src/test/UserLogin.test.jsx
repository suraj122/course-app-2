import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UserLogin from "../components/User/UserLogin";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/store/appStore";

describe("Login page test", () => {
  it("should render with login button in the document", () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <UserLogin />
        </BrowserRouter>
      </Provider>
    );
    const loginBtn = screen.getByRole("button", { name: "login" });
    expect(loginBtn).toBeInTheDocument();
  });
});
