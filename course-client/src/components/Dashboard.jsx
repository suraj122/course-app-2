import CourseCard from "./CourseCard";
import { Card, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetAdminCoursesQuery } from "../utils/store/slice/apiSlice";

const Dashboard = () => {
  const { data, isLoading, isError, error } = useGetAdminCoursesQuery();

  if (isLoading) {
    return <h1 className="text-center mt-4 text-2xl">Loading...</h1>;
  }

  if (isError) {
    return <h1 className="text-center mt-4 text-2xl">{error.data}</h1>;
  }

  return (
    <div className="bg-gray-200">
      <Container className="py-12">
        {data?.length === 0 ? (
          <h2>No Course found</h2>
        ) : (
          <Grid container spacing={6}>
            {data?.map((course) => (
              <Grid item xs={4} key={course._id}>
                <Link to={`/admin/courses/${course._id}`}>
                  <Card>
                    <CourseCard course={course} />
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
