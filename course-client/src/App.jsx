import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import CreateCourse from "./components/CreateCourse";
import UserLogin from "./components/User/UserLogin";
import UserSignup from "./components/User/UserSignup";
import Courses from "./components/User/Courses";
import Profile from "./components/User/Profile";
import UpdateCourse from "./components/UpdateCourse";
import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CourseDetails from "./components/CourseDetails";
import UserProtectedRoutes from "./components/User/UserProtectedRoutes";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/store/slice/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const data = await fetch("http://localhost:3000/admin/me", {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await data.json();
      if (json.user) {
        localStorage.setItem("user", JSON.stringify(json.user));
        dispatch(addUser(json.user));
      } else {
        dispatch(addUser(null));
        localStorage.clear();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CssBaseline>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/courses/:id" element={<CourseDetails />} />
            <Route path="admin/createcourse" element={<CreateCourse />} />
            <Route path="/admin/updatecourse/:id" element={<UpdateCourse />} />
          </Route>
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route element={<UserProtectedRoutes />}>
            <Route path="/user/courses" element={<Courses />} />
            <Route path="/user/courses/:id" element={<CourseDetails />} />
            <Route path="/user/me" element={<Profile />} />
          </Route>

          <Route path="*" element={<h1>Page not found 404</h1>} />
        </Routes>
      </BrowserRouter>
    </CssBaseline>
  );
}

export default App;
