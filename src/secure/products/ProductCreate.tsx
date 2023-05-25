import React, { useState} from 'react';
import Wrapper from "../Wrapper";
import axios from "axios";
import {Navigate} from 'react-router-dom';
import ImageUpload from "../components/ImageUpload";

const ProductCreate = () => {
    const [isRedirect, setIsRedirect] = useState(false);
    const [dataProduct, setDataProduct] = useState({
        title: '',
        description: '',
        image: '',
        price: 0
    });

    async function submit(e: any) {
        e.preventDefault();
        await axios.post('products', {
            title: dataProduct.title,
            description: dataProduct.description,
            image: dataProduct.image,
            price: dataProduct.price
        })
        setIsRedirect(prev => !prev)
    }

    function imageChanged(image: string) {
        setDataProduct(prevDataProduct => {
            return {
                ...prevDataProduct,
                image: image
            }
        })
    }

    return (
        <>
        {isRedirect && <Navigate to="/products"/>}
        <Wrapper>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={dataProduct.title}
                        onChange={e => setDataProduct(prevState => {
                            return {
                                ...prevState,
                                "title": e.target.value
                            }
                        })}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={dataProduct.description}
                        onChange={e => setDataProduct(prevState => {
                            return {
                                ...prevState,
                                "description": e.target.value
                            }
                        })}
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <ImageUpload value={dataProduct.image} imageChanged={imageChanged} />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={dataProduct.price}
                        onChange={e => setDataProduct(prevState => {
                            return {
                                ...prevState,
                                "price": parseFloat(e.target.value)
                            }
                        })}
                    />
                </div>
                <button className="btn btn-outline-secondary"> Save</button>
        </form>
        </Wrapper>
</>
)
    ;
};

export default ProductCreate;