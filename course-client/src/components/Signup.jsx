import { useState } from "react";
import validateForm from "../utils/validateForm";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/slice/userSlice";

const Signup = () => {
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
        const data = await fetch("http://localhost:3000/admin/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });
        const json = await data.json();
        setMessage(json.message);
        localStorage.setItem("token", json.token);
        dispatch(addUser(jwtDecode(json.token)));
        localStorage.setItem("user", JSON.stringify(jwtDecode(json.token)));
        navigate("/admin/dashboard");
        setFormData({ username: "", password: "" });
        setError(null);
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
        onChange={handleChange}
        name="username"
        value={formData.username}
        type="text"
        placeholder="Enter Username"
      />
      <br />
      <div>{error && error.username}</div>
      <input
        onChange={handleChange}
        name="password"
        value={formData.password}
        type="password"
        placeholder="Enter Password"
      />
      <br />
      <div>{error && error.password}</div>
      <button>Signup</button>
      {message && <h2>{message}</h2>}
    </form>
  );
};

export default Signup;
