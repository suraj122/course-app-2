import { useEffect, useState } from "react";

const UseFetchCourseDetails = (url) => {
  const [course, setCourse] = useState(null);
  useEffect(() => {
    fetchCourse();
  }, []);
  const fetchCourse = async () => {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const json = await data.json();
    if (json.course) {
      setCourse(json.course);
    }
  };
  return course;
};

export default UseFetchCourseDetails;
