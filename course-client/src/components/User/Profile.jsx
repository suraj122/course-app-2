import { useEffect, useState } from "react";
import CourseCard from "../CourseCard";
import { Container } from "@mui/material";

const Profile = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await fetch("http://localhost:3000/user/purchasedCourses", {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await data.json();
      setCourses(json.courses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      {courses.length === 0 ? (
        <h1>No courses found...</h1>
      ) : (
        <div>
          <h1 className="text-center font-bold my-6">
            Total Courses: {courses.length}
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Profile;
