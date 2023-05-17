import React, { useState } from 'react'

const Register = ({ history }) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errormessage, setErrormessage] = useState("");

    const handleSubmit = async () => {
        try {
            let res = await fetch("http://localhost:4000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ first_name: firstname, last_name: lastname, username, password })
            });
            console.log(res);
            const data = await res.json();
            console.log(data);
            if (data.err) {
                console.log("data.msg = ", data.msg);
                setErrormessage(data.msg);
            } else {
                sessionStorage.token = data.token;
                setErrormessage("");
                history.push("/login");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="register">
            <h1>Registration</h1>
            <h4>{errormessage}</h4>
            <input type="text" placeholder="firstname" onChange={e => setFirstname(e.target.value)} /><br />
            <input type="text" placeholder="lastname" onChange={e => setLastname(e.target.value)} /><br />
            <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} /><br />
            <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={handleSubmit}>Registration</button>
        </div>
    )
}

export default Register;












