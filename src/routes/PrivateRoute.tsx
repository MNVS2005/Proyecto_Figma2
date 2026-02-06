import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isAuth = localStorage.getItem("isAuth") === "true";

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
