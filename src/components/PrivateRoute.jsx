import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const isAu = true;
  return isAu ? children : <Navigate to={"/login"} />;
}

export default PrivateRoute;
