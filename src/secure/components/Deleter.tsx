import React from 'react';
import axios from "axios";

type Props = {
    id: number;
    endpoint: string;
    handleDelete: (id: number) => void;
};

const Deleter: React.FC<Props> = ({id, endpoint, handleDelete}) => {
    async function deleteItem() {
        if(window.confirm('Are you sure you want to delete this record?')) {
            await axios.delete(`${endpoint}/${id}`);

            handleDelete(id);
        }
    }

    return (
        <a className='btn btn-sm btn-outline-secondary'
           onClick={() => deleteItem()}
        >
            Delete
        </a>
    );
};

export default Deleter;