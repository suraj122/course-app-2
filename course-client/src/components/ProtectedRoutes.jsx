import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const user = useSelector((store) => store.user.user);

  return (
    <>{user?.role === "admin" ? <Outlet /> : <Navigate to="/admin/login" />}</>
  );
};

export default ProtectedRoutes;
