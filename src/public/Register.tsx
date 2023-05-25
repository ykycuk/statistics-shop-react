import React, {useState} from 'react';
import './Public.css'
import axios from "axios";
import {Navigate} from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [redirectIs, setRedirectIs] = useState(false);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            await axios.post('register', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                password_confirm: passwordConfirm,
                role: 1
            });
            setRedirectIs(true);

        } catch (err) {
            console.error(err)
        }
    }

    const inputFirstName = (event: { target: { value: React.SetStateAction<string> } }) => {
        setFirstName(event.target.value);
    };

    return (
        <>
            {redirectIs && <Navigate to="/login"/>}
            <form className='form-signin' onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>
                <div className="form-floating">
                    <input type="text" value={firstName} className="form-control" id="firstName"
                           placeholder="First Name" onChange={inputFirstName}/>
                    <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" value={lastName} className="form-control" id="lastName" placeholder="Last Name"
                           onChange={(e) => setLastName(prevName => e.target.value)}/>
                    <label htmlFor="lastName">Last Name</label>
                </div>
                <div className="form-floating">
                    <input type="email" value={email} className="form-control" id="email" placeholder="name@example.com"
                           onChange={(e) => setEmail(prevEmail => e.target.value)}/>
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" value={password} className="form-control" id="floatingPassword"
                           placeholder="Password" onChange={(e) => setPassword(prevPass => e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating">
                    <input type="passwordConfirm" value={passwordConfirm} className="form-control" id="passwordConfirm"
                           placeholder="Password Confirm"
                           onChange={(e) => setPasswordConfirm(prevPass => e.target.value)}/>
                    <label htmlFor="passwordConfirm">Password Confirm</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;