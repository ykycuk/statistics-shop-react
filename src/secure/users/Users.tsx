import React, {useEffect, useState} from 'react';
import Wrapper from "../Wrapper";
import axios from "axios";
import {User} from "../../classes/user";
import {Link} from 'react-router-dom';
import Paginator from "../components/Paginator";
import Deleter from "../components/Deleter";
import {useSelector} from "react-redux";


const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [countAllDataFetched, setCountAllDataFetched] = useState(0)
    const user = useSelector((state: any) => state.user);

    useEffect(() => {
        try {
            const getUsers = async () => {
                const response = await axios.get(`users?page=${page}`);
                const [...fetchedUsers] = response.data.data;
                setUsers((prevUsers) => fetchedUsers)
                setCountAllDataFetched((prev: number) => response.data.meta.last_page);
            };
            getUsers();

        } catch (error) {
            console.log(error);
        }
    }, [page])

    async function deleteUser(id: number) {
        setUsers(prevUsers => prevUsers.filter((user: User) => user.id !== id));
    }

    function addButton() {
        if (user.canEdit('users')) {
            return (
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link to={'/users/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
                    </div>
                </div>
            )
        }
    }

    const makeActions = (id: number) => {
        if(user.canEdit('users')) {
            return (
                <div className="btn-group mr-2">
                    <Link to={{
                        pathname: `/users/${id}/edit`
                    }} className='btn btn-sm btn-outline-secondary'>
                        Edit
                    </Link>
                    <Deleter id={id} endpoint='users' handleDelete={deleteUser}/>
                </div>
            )
        }
    }

    return (
        <Wrapper>
            {addButton()}
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user: User) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role.name}</td>
                                <td>
                                    {makeActions(user.id)}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <Paginator page={page} countAllDataFetched={countAllDataFetched} setPage={setPage}/>
        </Wrapper>
    )
}

export default Users;