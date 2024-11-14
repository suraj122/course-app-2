import { useState } from "react";
import CourseForm from "./CourseForm";
import { useCreateCourseMutation } from "../utils/store/slice/apiSlice";

const CreateCourse = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    imageLink: "",
  });
  const [published, setPublished] = useState(false);

  const [CreateCourse] = useCreateCourseMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await CreateCourse({ ...formData, published });
    setMessage(result.data.message);
  };

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

export default CreateCourse;
