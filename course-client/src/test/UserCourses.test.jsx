import { describe, expect, it } from "vitest";
// import Dashboard from "../components/Dashboard";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import appStore from "../utils/store/appStore";
import { BrowserRouter } from "react-router-dom";
import Courses from "../components/User/Courses";

describe("User Course test cases", () => {
  it("should render search button in the document", () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Courses />
        </BrowserRouter>
      </Provider>
    );
    const searchBtn = screen.getByRole("button", { name: "Search" });
    expect(searchBtn).toBeInTheDocument();
  });
  it("should render title in the document", async () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Courses />
        </BrowserRouter>
      </Provider>
    );

    const title1 = await screen.findByText("Frontend Development");
    expect(title1).toBeInTheDocument();
  });

  it("should render Backend Devlopment Card when search", async () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Courses />
        </BrowserRouter>
      </Provider>
    );
    const searchInput = screen.getByTestId("search");
    const searchBtn = screen.getByRole("button", { name: "Search" });
    const cardsBefore = await screen.findAllByTestId("course-card");

    fireEvent.change(searchInput, { target: { value: "backend" } });
    fireEvent.click(searchBtn);
    const cardsAfter = await screen.findAllByTestId("course-card");
    expect(cardsAfter.length).toBe(1);
  });
});
