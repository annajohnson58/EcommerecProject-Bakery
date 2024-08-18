

import React, { useState, useEffect } from 'react';
import './product.css';
import { FaTrash,FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import add_product_icon from '../../assets/addproduct.png';


const Product = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                await sendTotalProductsToServer(data.length);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const sendTotalProductsToServer = async (totalCount) => {
        try {
            const response = await fetch('http://localhost:5000/dashboard/total-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ totalCount }),
            });

            if (!response.ok) {
                throw new Error('Failed to send total products to server');
            }

            console.log('Total products sent to server:', totalCount);
        } catch (error) {
            console.error("Error sending total products to server:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            const updatedProducts = products.filter((product) => product._id !== id);
            setProducts(updatedProducts);
            await sendTotalProductsToServer(updatedProducts.length);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUpdate = (product) => {
        navigate('/updateproduct', { state: { product } });
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="mainp">
                <div className="list-product">
                    <div className="add-product-icon" onClick={() => navigate('/addproduct')}>
                        <img src={add_product_icon} alt="Add Product" style={{ width: '40px', marginRight: '10px' }} />
                        <span>Add Product</span>
                    </div>
                    <h1>All Products List</h1>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{width:'400px'}}
                    />
                </div>
                <div className="section">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>PRODUCT</th>
                                <th>CATEGORY</th>
                                <th>DESCRIPTION</th>
                                <th>PRICE</th>
                                <th>REMOVE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img style={{ width: '100px' }} src={product.image} alt={product.name} />
                                        &nbsp; {product.name}
                                    </td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>
                                    <td>${product.new_price}</td>
                                    <td>
                                        <FaTrash
                                            className="fa-trash"
                                            onClick={() => handleDelete(product._id)}
                                        />
                                        <FaEdit onClick={() => handleUpdate(product)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Product;