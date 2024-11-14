import { useState } from "react";
import validateForm from "../utils/validateForm";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/slice/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(formData);
    if (Object.keys(error).length === 0) {
      try {
        const data = await fetch("http://localhost:3000/admin/login", {
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
        dispatch(addUser(jwtDecode(json.token)));
        localStorage.setItem("user", JSON.stringify(jwtDecode(json.token)));
        navigate("/admin/dashboard");
        setError(null);
        setFormData({ username: "", password: "" });
      } catch (error) {
        console.error(error);
      }
    } else {
      setError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form onSubmit={handleSubmit} action="">
      <input
        name="username"
        onChange={handleChange}
        value={formData.username}
        type="text"
        placeholder="Enter Username"
      />
      <br />
      {error && error.username}
      <br />
      <input
        name="password"
        onChange={handleChange}
        value={formData.password}
        type="password"
        placeholder="Enter Password"
      />
      <br />
      {error && error.password}
      <button>Login</button>
      {message && <h1>{message}</h1>}
    </form>
  );
};

export default Login;
