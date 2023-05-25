import React, {useEffect, useState} from 'react';
import Wrapper from "../Wrapper";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Order} from "../../classes/order";
import {OrderItem} from "../../classes/orderItem";

const OrderItems = () => {
    const [orderItems, setOrderItems] = useState([]);
    const id = useParams().id

    useEffect(() => {
        const getOrderItems = async () => {
            const res = await axios.get(`orders/${id}`);
            const order: Order = res.data.data;
            console.log(order);
            // @ts-ignore
            setOrderItems(prevOrderItems => {
                return order.order_items
            })
        }
        getOrderItems()
    }, [])
    return (
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderItems.map((orderItem: OrderItem) => {
                        return (
                            <tr key={orderItem.id}>
                                <td>{orderItem.id}</td>
                                <td>{orderItem.product_title}</td>
                                <td>{orderItem.price}</td>
                                <td>{orderItem.quantity}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

export default OrderItems;