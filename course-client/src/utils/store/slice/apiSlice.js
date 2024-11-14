import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constant";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Courses"],
  endpoints: (builder) => ({
    getAdminCourses: builder.query({
      query: () => ({
        url: "/admin/courses",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      transformResponse: (courses) => courses?.courses?.reverse(),
      providesTags: ["Courses"],
    }),
    createCourse: builder.mutation({
      query: (course) => ({
        url: "/admin/courses",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: course,
      }),
      invalidatesTags: ["Courses"],
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `admin/courses/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      providesTags: ["Courses"],
    }),
    updateCourse: builder.mutation({
      query: ({ id, ...updatedCourse }) => ({
        url: `/admin/courses/${id}`,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: updatedCourse,
      }),
      async onQueryStarted(
        { id, ...updatedCourse },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData("getCourseDetails", id, (draft) => {
            // const courseIndex = draft.findIndex((course) => course.id === id);
            // draft[courseIndex] = { ...draft[courseIndex], ...updatedCourse };
            Object.assign(draft, updatedCourse);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const {
  useGetAdminCoursesQuery,
  useCreateCourseMutation,
  useGetCourseDetailsQuery,
  useUpdateCourseMutation,
} = api;
// export default api;
