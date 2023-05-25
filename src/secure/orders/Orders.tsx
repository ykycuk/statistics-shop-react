import React, {useEffect, useState} from 'react';
import Wrapper from "../Wrapper";
import axios from "axios";
import {Link} from "react-router-dom";
import {Order} from "../../classes/order";
import Paginator from "../components/Paginator";
//@ts-ignore
import Papa from 'papaparse';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [countAllDataFetched, setCountAllDataFetched] = useState(0)
    const [page, setPage] = useState(1);
    const [exportData, setExportData] = useState('');

    useEffect(() => {
        const getOrders = async () => {
            const res = await axios.get(`orders?page=${page}`);
            // @ts-ignore
            setOrders(prevOrders => {
                return [...res.data.data]
            })
            setCountAllDataFetched((prev: number) => res.data.meta.last_page);

        }
        getOrders();
    }, [page])

    const handleExport = async () => {
        const response = await axios.get('export', {responseType: 'blob'});
        const blob = new Blob([response.data], {type: 'text/csv'});
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'orders.csv';
        link.click();
    }

    return (
        <Wrapper>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <a onClick={() => handleExport()} className="btn btn-sm btn-outline-secondary">Export</a>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order: Order) => {
                        return (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.first_name} {order.last_name}</td>
                                <td>{order.email}</td>
                                <td>{order.total}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={{
                                            pathname: `/orders/${order.id}`
                                        }} className='btn btn-sm btn-outline-secondary'>
                                            View
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            <Paginator page={page} countAllDataFetched={countAllDataFetched} setPage={setPage} />
        </Wrapper>
    );
};

export default Orders;