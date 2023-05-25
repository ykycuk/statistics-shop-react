import React, {useState} from "react";
import './Public.css';
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            await axios.post('login', {
                email: email,
                password: password
            });
            setIsRedirect(prev => !prev);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {isRedirect && <Navigate to="/"/>}
            <form className='form-signin' onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="email" value={email} onChange={(e) => setEmail((prev) => e.target.value)} className="form-control" id="floatingInput" placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" value={password} onChange={(e) => setPassword(prevPassword => e.target.value)} className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </>
    )
}

export default Login;