import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
const PrivateRoute = ({ children }) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      return children;
    } else {
      <Navigate to="/login" />;
    }
  });
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
