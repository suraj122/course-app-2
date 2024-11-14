import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Profile from "../components/User/Profile";
import appStore from "../utils/store/appStore";

describe("Profile page test cases", () => {
  it("should render Total Courses: 1 in the document", async () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </Provider>
    );
    const totalCourse = await screen.findByText("Total Courses: 1");
    expect(totalCourse).toBeInTheDocument();
  });
});
