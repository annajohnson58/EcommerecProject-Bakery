

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import { useUser } from '../../context/UserContext';

const Cart = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user && user._id) {
            fetchCartItems();
        } else {
            setLoading(false); 
        }
    }, [user]);

    const fetchCartItems = async () => {
        setLoading(true);
        if (!user || !user._id) return;

        try {
            const response = await fetch(`http://localhost:5000/cart/${user._id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }

            const data = await response.json();
            console.log('Fetched Cart Items:', data);
            setCartItems(data.length > 0 ? data : []); 
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return; 

        
        setCartItems(prevItems => 
            prevItems.map(cartItem => ({
                ...cartItem,
                items: cartItem.items.map(item => 
                    item._id === itemId ? { ...item, quantity: newQuantity } : item
                )
            }))
        );

        try {
            const response = await fetch('http://localhost:5000/cart/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ id: itemId, quantity: newQuantity }),
            });

            if (!response.ok) {
                throw new Error('Failed to update cart item');
            }
           
        } catch (error) {
            console.error('Error updating cart item:', error);
            setError(error.message);
            fetchCartItems(); 
        }
    };

    const handleRemoveItem = async (itemId) => {
        const confirmRemoval = window.confirm('Are you sure you want to remove this item?');
        if (!confirmRemoval) return;

        
        setCartItems(prevItems => 
            prevItems.map(cartItem => ({
                ...cartItem,
                items: cartItem.items.filter(item => item._id !== itemId)
            }))
        );

        try {
            const response = await fetch(`http://localhost:5000/cart/remove/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to remove cart item');
            }

            
        } catch (error) {
            console.error('Error removing cart item:', error);
            setError(error.message);
            fetchCartItems(); 
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, cartItem) => {
            return total + cartItem.items.reduce((itemTotal, item) => {
                return itemTotal + (item.productId?.new_price || 0) * item.quantity;
            }, 0);
        }, 0);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items before checking out.');
            return;
        }
        navigate('/checkout');
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {loading ? (
                <p>Loading cart items...</p>
            ) : error ? (
                <p className="error-message">{error}</p> 
            ) : Array.isArray(cartItems) && cartItems.length > 0 ? (
                <div>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(cart => (
                                cart.items.map(item => (
                                    <tr key={item._id}>
                                        <td>
                                            {item.productId ? (
                                                <>
                                                    <img style={{ width: "200px" }} src={item.productId?.image} alt={item.productId?.name} />
                                                    {item.productId?.name}
                                                </>
                                            ) : (
                                                'Product not found'
                                            )}
                                        </td>
                                        <td>${(item.productId?.new_price || 0).toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                readOnly
                                            />
                                            <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                                        </td>
                                        <td>${((item.productId?.new_price || 0) * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                    <div className="cart-summary">
                        <h2>Total: ${calculateTotal().toFixed(2)}</h2>
                        <button onClick={handleCheckout} className="checkout-button">Checkout</button>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
