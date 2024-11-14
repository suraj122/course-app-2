import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/store/slice/userSlice";

const UserLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
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
      const data = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          username: formData.username,
          password: formData.password,
        },
      });
      const json = await data.json();
      setMessage(json.message);
      localStorage.setItem("token", json.token);
      localStorage.setItem("user", JSON.stringify(jwtDecode(json.token)));
      dispatch(addUser(jwtDecode(json.token)));
      navigate("/user/courses");
      setFormData({
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
        type="text"
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button>login</button>
      {message && message}
    </form>
  );
};

export default UserLogin;
