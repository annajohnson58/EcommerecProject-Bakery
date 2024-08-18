import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaCartPlus, FaTrash } from 'react-icons/fa';
import './wishlist.css';

const Wishlist = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        if (user && user._id) {
            fetchWishlistItems();
        } else {
            setLoading(false); // If not logged in, stop loading
        }
    }, [user]);

    const fetchWishlistItems = async () => {
        setLoading(true); // Set loading to true when starting to fetch
        if (!user || !user._id) return;

        try {
            const response = await fetch(`http://localhost:5000/wishlist/${user._id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch wishlist items');
            const data = await response.json();
            setWishlistItems(data);
        } catch (error) {
            console.error('Error fetching wishlist items:', error);
            setError(error.message);
        } finally {
            setLoading(false); // Set loading to false after fetching is complete
        }
    };

    const handleAddToCart = async (item) => {
        if (!user || !user._id) return;

        try {
            const response = await fetch('http://localhost:5000/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productId: item.productId._id, quantity: 1 }),
            });

            if (!response.ok) throw new Error('Failed to add item to cart');
            const data = await response.json();
            console.log('Item added to cart:', data);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleRemoveItem = async (id) => {
        if (!user || !user._id) return;

        try {
            const response = await fetch(`http://localhost:5000/wishlist/remove/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) throw new Error('Failed to remove item from wishlist');
            fetchWishlistItems(); // Refresh the wishlist after removal
        } catch (error) {
            console.error('Error removing item from wishlist:', error);
        }
    };

    return (
        <div className="wishlist-container">
            <h1>Your Wishlist</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? ( // Show loading message while fetching
                <p>Loading wishlist items...</p>
            ) : Array.isArray(wishlistItems) && wishlistItems.length > 0 ? (
                <table className="wishlist-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlistItems.map(item => (
                            <tr key={item._id}>
                                <td>
                                    <img style={{ width: "100px" }} src={item.productId.image} alt={item.productId.name} />
                                    {item.productId.name}
                                </td>
                                <td>${item.productId.new_price.toFixed(2)}</td>
                                <td>
                                    <FaCartPlus 
                                        onClick={() => handleAddToCart(item)} 
                                        style={{ cursor: 'pointer', marginRight: '10px', color: 'green' }} 
                                        title="Add to Cart" 
                                    />
                                    <FaTrash 
                                        onClick={() => handleRemoveItem(item._id)} 
                                        style={{ cursor: 'pointer', color: 'red' }} 
                                        title="Remove from Wishlist" 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default Wishlist;