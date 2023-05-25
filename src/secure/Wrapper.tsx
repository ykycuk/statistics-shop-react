import React, {Dispatch, useEffect, useState} from 'react';
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import setUser from "../redux/actions/setFetchedUserAction";
import {User} from "../classes/user";

const Wrapper = ({children}: any) => {
    const [isRedirect, setIsRedirect] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            (async function fetchUser() {
                const res = await axios.get('user');
                const user: User = res.data.data;

                dispatch(setUser(new User(
                    user.id,
                    user.first_name,
                    user.last_name,
                    user.email,
                    user.role,
                    user.permissions
                )));
            })()
        } catch (e) {
            setIsRedirect(prevState => !prevState)
        }

    }, [])

    return (
        <>
            {isRedirect && <Navigate to="/"/>}
            <>
                <Nav/>
                <div className="container-fluid">
                    <div className="row">
                        <Menu/>

                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            {children}
                        </main>
                    </div>
                </div>
            </>
        </>

    );
}

export default Wrapper;