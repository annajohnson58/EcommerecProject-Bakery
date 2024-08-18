

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './updateproduct.css';
import upload_area from '../../../assets/upload.svg';

const UpdateProduct = () => {
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const initialProduct = location.state?.product || {
        _id: '',
        name: '',
        new_price: '',
        category: '',
        description: '',
        img: '',
    };

    const [product, setProduct] = useState(initialProduct);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product._id) {
            console.error('Product ID is undefined');
            return; 
        }

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('new_price', product.new_price);
        formData.append('category', product.category);
        formData.append('description', product.description);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`http://localhost:5000/products/${product._id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const updatedProduct = await response.json();
            console.log('Product Updated:', updatedProduct);
            
            navigate('/product'); 
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className='m'>
            <div className='f'>
                <h2>Update Product</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:
                        <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required />
                    </label>
                    <label htmlFor="new_price">Price:
                        <input type="number" id="new_price" name="new_price" value={product.new_price} onChange={handleChange} required />
                    </label>
                    <label htmlFor="category">Category:
                        <input type="text" id="category" name="category" value={product.category} onChange={handleChange} required />
                    </label>
                    <label htmlFor="description">Description:
                        <input type="text" id='description' name="description" value={product.description} onChange={handleChange} required />
                    </label>
                    <label htmlFor="file-input">
                        <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="Upload" />
                    </label>
                    <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;