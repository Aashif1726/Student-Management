import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./utils/Auth";

 const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute


