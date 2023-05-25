import React, {useState} from "react";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Nav = () => {
    const [isRedirect, setIsRedirect] = useState(false)
    const user = useSelector((state: any) => state.user)

    const handleClick = async () => {
        await axios.post('logout', {});
        setIsRedirect(true);
    }

    return (
        <>
            {isRedirect && <Navigate to='/login'/>}
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Company name</a>

                <ul className="my-2 my-md-0 mr-md-3">
                    <Link to={'/profile'}
                          className="p-2 text-white">User: {user.name}</Link>
                    <a className="p-2 text-white" href="#" onClick={() => handleClick()}>Sign out</a>
                </ul>
            </nav>
        </>
    )
};

export default Nav;