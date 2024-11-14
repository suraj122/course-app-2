import { http, HttpResponse } from "msw";
import MOCK_DATA from "./userCourses.json";
import MOCK_DATA_PURCHASED_COURSE from "./purchasedCourseMock.json";

export const handlers = [
  http.get("http://localhost:3000/user/courses", () => {
    return HttpResponse.json(
      {
        courses: MOCK_DATA,
      },
      { status: 200 }
    );
  }),

  http.get("http://localhost:3000/user/purchasedCourses", () => {
    return HttpResponse.json(
      {
        courses: MOCK_DATA_PURCHASED_COURSE,
      },
      { status: 200 }
    );
  }),
];
