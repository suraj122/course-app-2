import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseForm from "./CourseForm";
import {
  useGetCourseDetailsQuery,
  useUpdateCourseMutation,
} from "../utils/store/slice/apiSlice";

const UpdateCourse = () => {
  const [message, setMessage] = useState("");
  const [published, setPublished] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    imageLink: "",
  });

  const params = useParams();
  const { data, isLoading, isError, error } = useGetCourseDetailsQuery(
    params.id
  );

  const [updateCourse] = useUpdateCourseMutation();

  useEffect(() => {
    if (!isLoading && !isError) {
      const { course } = data;

      setFormData({
        title: course?.title,
        description: course?.description,
        price: course?.price,
        imageLink: course?.imageLink,
      });

      setPublished(course?.published);
    }
  }, [isLoading, data, isError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateCourse({
      id: params.id,
      ...formData,
      published,
    });
    if (result.error) {
      setMessage("something went wrong");
    } else {
      setMessage(result.data.message);
    }

    // refetch();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading)
    return <h1 className="text-center font-bold text-xl">Loading...</h1>;
  if (isError)
    return (
      <h1 className="text-center font-bold text-xl">{error.data.message}</h1>
    );
  return (
    <CourseForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      published={published}
      setPublished={setPublished}
      message={message}
    />
  );
};

export default UpdateCourse;
