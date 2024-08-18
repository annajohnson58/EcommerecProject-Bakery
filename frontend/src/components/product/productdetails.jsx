
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './productdetails.css';
import { useUser } from '../../context/UserContext';


const ProductDetails = () => {
    const { user } = useUser();
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProductDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`); 
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!user || !user._id) {
            alert('You must be logged in to add items to your cart');
navigate('/signin')
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in the header
                    
                },
                body: JSON.stringify({ productId: product._id, quantity: 1 }), 
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            // const cartItem = await response.json();
            alert(`${product.name} has been added to your cart!`); 
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchProductDetails(); 
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-details">
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <h2>Price: ${product.new_price}</h2>
            <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;