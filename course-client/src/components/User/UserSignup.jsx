import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/store/slice/userSlice";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });
      const json = await data.json();
      setMessage(json.message);
      localStorage.setItem("token", json.token);
      dispatch(addUser(jwtDecode(json.token)));
      localStorage.setItem("user", JSON.stringify(jwtDecode(json.token)));
      navigate("/user/courses");
      setFormData({
        email: "",
        username: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="email"
        name="email"
        onChange={handleChange}
        value={formData.email}
      />
      <br />
      <input
        type="text"
        placeholder="username"
        name="username"
        onChange={handleChange}
        value={formData.username}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
      />
      <br />
      <button>signup</button>
      {message && message}
    </form>
  );
};

export default UserSignup;
