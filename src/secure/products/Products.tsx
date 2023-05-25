import React, {useEffect, useState} from 'react';
import Wrapper from "../Wrapper";
import {Link} from "react-router-dom";
import axios from "axios";
import {Product} from "../../classes/product";
import Paginator from "../components/Paginator";
import Deleter from "../components/Deleter";
import {useSelector} from "react-redux";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [countAllDataFetched, setCountAllDataFetched] = useState(0);
    const user = useSelector((state: any) => state.user);

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`products?page=${page}`);
            const [...fetchedProducts] = res.data.data;
            // @ts-ignore
            setProducts(prevProducts => {
                return fetchedProducts;
            })
            setCountAllDataFetched((prev:number) => res.data.meta.last_page);
        }
        getProducts();
    }, [page]);

    const deleteProduct = async (id: number) => {
            setProducts(prevProducts => prevProducts.filter((product: Product) => product.id !== id));
    }

    function addButton() {
        if (user.canEdit('products')) {
            return (
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link to={'/products/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
                    </div>
                </div>
            )
        }
    }

    const makeActions = (id: number) => {
        if(user.canEdit('products')) {
            return (
                <div className="btn-group mr-2">
                    <Link to={{
                        pathname: `/products/${id}/edit`
                    }} className='btn btn-sm btn-outline-secondary'>
                        Edit
                    </Link>
                    <Deleter id={id} endpoint="products" handleDelete={deleteProduct} />
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
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product: Product) => {
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><img src={product.image} width='50'/></td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{makeActions(product.id)}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <Paginator page={page} countAllDataFetched={countAllDataFetched} setPage={setPage}/>
        </Wrapper>
    );
};

export default Products;