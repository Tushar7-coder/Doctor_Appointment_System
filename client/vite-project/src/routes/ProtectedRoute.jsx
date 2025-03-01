import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ children,allowedRoles }) => {
  const { token, role } = useContext(AuthContext);
  console.log("Current Role:", role);
  console.log("Allowed Roles:", allowedRoles);

  const isAllowed = allowedRoles.includes(role);
  const  accessibleRoute = token && isAllowed ? children : <Navigate to="/login"  replace={true}/> ;

 	return accessibleRoute;
};
export default ProtectedRoute;