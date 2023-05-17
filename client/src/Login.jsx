import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errormessage, setErrormessage] = useState("");
 
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let res = await fetch("http://localhost:4000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        let data = await res.json();
        //console.log(data);

        if (data && data.error) {
            //console.log("data.msg = ", data.msg);
            setErrormessage(data.msg);
        } else {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('name', data.name);
            sessionStorage.setItem('role', data.role);

            dispatch({
                type: "LOGIN",
                payload: {name:data.name}
              });

            //console.log('login.handleSubmit: data = ', data);

            setErrormessage(""); // reset
            history.push("/");
        }
        //console.log(data);
    };

    return (
        <div className="formLogin">
            <form className="form">
                <h1>Login</h1>
                <h4>{errormessage}</h4>
                <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
                <br />
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                <br />
                <Link to="/register">For registration</Link>
                <br /><br />
                <button onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}

export default Login;