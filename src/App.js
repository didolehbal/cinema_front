import React from "react";

import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound404 from "./pages/NotFound404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading"
function App() {
  const { isLoggedIn, isLoading } = useAuth();
  if(isLoading)
    return <Loading/>
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" isLoggedIn={isLoggedIn}>
          <Home />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
