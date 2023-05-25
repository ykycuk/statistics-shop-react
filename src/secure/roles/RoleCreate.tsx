import React, {useEffect, useState} from 'react';
import Wrapper from "../Wrapper";
import axios from "axios";
import {Permission} from "../../classes/permission";
import {Navigate} from 'react-router-dom';

const RoleCreate = () => {
    const [isRedirect, setIsRedirect] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const getPermissions = async () => {
            const res = await axios.get('permissions');
            setPermissions((prePer: Permission[]) => {
                return res.data.data
            })
        }
        getPermissions();
    }, []);

    const checkPermissions = (id: number) => {

        if (selectedPermissions.filter(s => s === id).length > 0) {
            setSelectedPermissions(prevState => {
                return prevState.filter(s => s !== id)
            })
            return;
        }

        // @ts-ignore
        setSelectedPermissions((prevState: number[]) => {
            return [...prevState, id];
        })
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await axios.post('roles', {
            name,
            permissions: selectedPermissions
        });
        setIsRedirect(prev => !prev)
    }

    return (
        <>
            {isRedirect && <Navigate to="/roles"/>}
            <Wrapper>
                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                id="name"
                                value={name}
                                onChange={e => setName(prevVal => e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Permissions</label>
                        <div className="col-sm-10">
                            {permissions.map((permission: Permission) => {
                                return (
                                    <div key={permission.id} className="form-check form-check-inline col-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={permission.id}
                                            onChange={(e: any) => checkPermissions(permission.id)}
                                        />
                                        <label className="form-check-label">{permission.name}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <button className="btn btn-outline-secondary">Save</button>
                </form>
            </Wrapper>
        </>

    );
};

export default RoleCreate;