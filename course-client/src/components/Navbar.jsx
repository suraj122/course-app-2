import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/store/slice/userSlice";

export default function Navbar() {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(addUser(null));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">CourseApp</Link>
          </Typography>
          {user ? (
            <>
              <Typography>{user?.username}</Typography>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                style={{ color: "white" }}
                to={user?.role === "admin" ? "/admin/login" : "/user/login"}
              >
                <Button color="inherit">Login</Button>
              </Link>

              <Link
                style={{ color: "white" }}
                to={user?.role === "admin" ? "/admin/signup" : "/user/signup"}
              >
                <Button color="inherit">signup</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
