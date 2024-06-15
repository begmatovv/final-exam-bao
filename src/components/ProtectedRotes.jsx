import { Navigate } from "react-router-dom";

const ProtectedRotes = ({ children, user }) => {
  if (user) {
    return children;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default ProtectedRotes;
