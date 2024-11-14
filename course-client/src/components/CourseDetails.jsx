import { Card, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CourseCard from "./CourseCard";
import UpdateCourse from "./UpdateCourse";
import { useGetCourseDetailsQuery } from "../utils/store/slice/apiSlice";

const CourseDetails = () => {
  const params = useParams();
  const { data, isLoading, isError, error } = useGetCourseDetailsQuery(
    params.id
  );

  if (isLoading)
    return <h1 className="text-center font-bold text-xl">Loading...</h1>;
  if (isError)
    return (
      <h1 className="text-center font-bold text-xl">{error.data.message}</h1>
    );
  const { course } = data;
  return (
    <>
      <div className="bg-gray-300 text-center py-24">
        <Container>
          <Typography variant="h3" component="h1">
            {course?.title}
          </Typography>
        </Container>
      </div>
      <Container>
        {course ? (
          <div className="flex gap-2 justify-center">
            <UpdateCourse />
            <Card>
              <CourseCard course={course} />
            </Card>
          </div>
        ) : (
          "Loading..."
        )}
      </Container>
    </>
  );
};

export default CourseDetails;
