import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CourseCard from "../components/CourseCard";
import { Provider } from "react-redux";
import appStore from "../utils/store/appStore";
import MOCK_DATA from "../utils/mocks/courseMock.json";
import BuyCourse from "../components/User/BuyCourse";

describe("Course Card test cases", () => {
  it("should render course card title in the document", () => {
    render(
      <Provider store={appStore}>
        <CourseCard course={MOCK_DATA} />
      </Provider>
    );
    const title = screen.getByText("Microsoft world");
    expect(title).toBeInTheDocument();
  });

  it("should render learn more button in the document", () => {
    render(
      <Provider store={appStore}>
        <CourseCard course={MOCK_DATA} />
      </Provider>
    );
    const learnMoreBtn = screen.getByRole("button", { name: "Learn More" });

    expect(learnMoreBtn).toBeInTheDocument();
  });

  it("should load enrol button in the document", () => {
    const UserCourseCard = BuyCourse(CourseCard);
    render(<UserCourseCard course={MOCK_DATA} />);
    const enrolButton = screen.getByRole("button", { name: "Enrol" });
    expect(enrolButton).toBeInTheDocument();
  });
});
