import { useEffect, useState } from "react";
import CourseCard from "../CourseCard";
import BuyCourse from "./BuyCourse";
import { Card, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const UserCourseCard = BuyCourse(CourseCard);

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await fetch("http://localhost:3000/user/courses", {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await data.json();
      setCourses(json.courses);
      setFilteredCourse(json.courses);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundCourse = courses.filter((course) =>
      course.title.toLowerCase().includes(searchText.toLowerCase())
    );
    if (foundCourse.length > 0) {
      setFilteredCourse(foundCourse);
    } else {
      setMessage("No course found");
      setFilteredCourse([]);
    }
  };

  return (
    <div className="bg-gray-200 py-12">
      <Container>
        <form className="flex justify-center items-center pb-8">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-3 py-1"
            type="text"
            placeholder="search"
            data-testid="search"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-300 rounded px-3 py-1 font-semibold"
          >
            Search
          </button>
        </form>
        {filteredCourse.length === 0 ? (
          <h1>{message}</h1>
        ) : (
          <Grid container spacing={6}>
            {filteredCourse?.map((course) => (
              <Grid item xs={4} key={course._id}>
                <Link to={`/user/courses/${course._id}`}>
                  <Card>
                    <UserCourseCard course={course} />
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

export default Courses;
