import React, {useEffect, useState} from 'react';
import Wrapper from "../Wrapper";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import setUser from "../../redux/actions/setFetchedUserAction";
import {User} from "../../classes/user";

const Profile = () => {
    const [dataUser, setDataUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: ''
    })

    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        (function initiallySetDataUser() {
            setDataUser(prevState => {
                return {
                    ...prevState,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }
            })
        })()
    }, [user])

    const updatePassword = async (e: any) => {
        e.preventDefault();
        await axios.put('users/password', {
            password: dataUser.password,
            password_confirm: dataUser.password_confirm
        })
    };

    const updateInfo = async (e: any) => {
        e.preventDefault();
        const res = await axios.put('users/info', {
            first_name: dataUser.first_name,
            last_name: dataUser.last_name,
            email: dataUser.email
        })
        const userUpdated: User = res.data
        dispatch(setUser(new User(
            userUpdated.id,
            userUpdated.first_name,
            userUpdated.last_name,
            userUpdated.email,
            userUpdated.role,
            userUpdated.permissions)));
    };

    return (
        <Wrapper>

            <h2>Account Information</h2>
            <hr />
            <form onSubmit={updateInfo}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name='first_name'
                        value={dataUser.first_name}
                        onChange={e => setDataUser(prevData => {
                            return {
                                ...prevData,
                                [e.target.name]: e.target.value
                            }
                        })}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name='last_name'
                        value={dataUser.last_name}
                        onChange={e => setDataUser(prevData => {
                            return {
                                ...prevData,
                                [e.target.name]: e.target.value
                            }
                        })}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        className="form-control"
                        name='email'
                        value={dataUser.email}
                        onChange={e => setDataUser(prevData => {
                            return {
                                ...prevData,
                                [e.target.name]: e.target.value
                            }
                        })}
                    />
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>

            <h2 className="mt-4">Change Password</h2>
            <hr />
            <form onSubmit={updatePassword}>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name='password'
                        value={dataUser.password}
                        onChange={e => setDataUser(prevData => {
                            return {
                                ...prevData,
                                [e.target.name]: e.target.value
                            }
                        })}
                    />
                </div>
                <div className="form-group">
                    <label>Password Confirm</label>
                    <input
                        type="password"
                        className="form-control"
                        name='password_confirm'
                        value={dataUser.password_confirm}
                        onChange={e => setDataUser(prevData => {
                            return {
                                ...prevData,
                                [e.target.name]: e.target.value
                            }
                        })}
                    />
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default Profile;