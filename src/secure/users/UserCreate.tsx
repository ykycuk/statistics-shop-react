import React, {useEffect, useState} from 'react';
import Wrapper from "../Wrapper";
import axios from "axios";
import {Role} from "../../classes/role";
import { Navigate } from 'react-router-dom';

function UserCreate() {
    const [roles, setRoles] = useState([]);
    const [redirectIs, setRedirectIs] = useState(false);
    const [dataUser, setDataUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role_id: 0
    });

    useEffect(() => {
        async function getRoles() {
            const res = await axios.get('roles');
            const [...fetchRoles] = res.data.data;
            setRoles(prevState => fetchRoles);
        }

        getRoles();
    }, [])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await axios.post('users', {
            first_name: dataUser.first_name,
            last_name: dataUser.last_name,
            email: dataUser.email,
            role_id: dataUser.role_id,
        });
        setRedirectIs(prev => !prev);
    }

    return (
        <>
            {redirectIs && <Navigate to='/users'/>}
            <Wrapper>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" name="first_name"
                               onChange={(e) => setDataUser(prevData => {
                                   return {
                                       ...prevData,
                                       first_name: e.target.value
                                   }
                               })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" name="last_name"
                               onChange={(e) => setDataUser(prevData => {
                                   return {
                                       ...prevData,
                                       last_name: e.target.value
                                   }
                               })}
                        />
                    </div>
                    <div className="form-group">
                        <label>email</label>
                        <input type="text" className="form-control" name="email"
                               onChange={(e) => setDataUser(prevData => {
                                   return {
                                       ...prevData,
                                       email: e.target.value
                                   }
                               })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select name="role_id" className="form-control"
                                onChange={(e) => setDataUser((prevData) => {
                                    return {
                                        ...prevData,
                                        role_id: parseInt(e.target.value)
                                    }
                                })}
                        >
                            <option>Select Role</option>
                            {roles.map((role: Role) => {
                                return (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <button className="btn btn-outline-secondary">Save</button>
                </form>
            </Wrapper>
        </>

    )
}

export default UserCreate;
