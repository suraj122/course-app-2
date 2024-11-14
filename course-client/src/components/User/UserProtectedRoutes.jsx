import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProtectedRoutes = () => {
  const user = useSelector((store) => store.user.user);
  return (
    <>{user?.role === "user" ? <Outlet /> : <Navigate to="/user/login" />}</>
  );
};

export default UserProtectedRoutes;
