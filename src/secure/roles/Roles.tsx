import React, {SyntheticEvent, useEffect, useState} from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import {Role} from "../../classes/role";
import {Link} from "react-router-dom";
import Deleter from "../components/Deleter";

const Roles = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        async function getRoles() {
            const res = await axios.get('roles');
            setRoles((prevRoles: Role[]) => {
                return res.data.data
            });
        }

        getRoles();
    }, [])

    const deleteRole = async (id: number) => {
        setRoles(prevUsers => prevUsers.filter((role: Role) => role.id !== id));
    }
    return (
        <Wrapper>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to={'/roles/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {roles.map((role: Role) => {
                        return (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.name}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={{
                                            pathname: `/roles/${role.id}/edit`
                                        }} className='btn btn-sm btn-outline-secondary'>
                                            Edit
                                        </Link>
                                        <Deleter id={role.id} endpoint="roles" handleDelete={deleteRole}/>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
}

export default Roles;