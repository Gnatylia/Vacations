import { Route, useHistory } from "react-router-dom";
import './App.css';
import Vacations from './Vacations';
import Login from "./Login";
import Register from "./Register";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


function App() {
  let history = useHistory();

  const username = useSelector((state) => state.name);
  const dispatch = useDispatch();

  useEffect(() => {
    //console.debug("App.useEffect: username = ", username);
    let _sessionName = sessionStorage.getItem('name');
    if (_sessionName) {
      dispatch({
        type: "LOGIN",
        payload: {name:_sessionName}, 
      });
    }
  }, [dispatch, username]);

  const logout = () => {
    sessionStorage.clear();
    dispatch({
      type: "LOGOUT"
    });
    history.push("/login");
  };


  return (
    <div className="App">
      <header>
        <h1>Vacations</h1>
        {
          (username) ? (
            <div className="logon">
              <label>Hello {username}</label>
              <button onClick={logout}>logout</button>
            </div>
          ) : (<label></label>)
        }
      </header>

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" exact component={Vacations} />

    </div>
  );
}

export default App;
