import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart as HeartFilled } from 'react-icons/fa';
import { FaRegHeart as HeartOutline } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import './products.css';

const ProductPage = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products');
                if (!response.ok) throw new Error('Failed to fetch products.');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

   
    useEffect(() => {
        const fetchWishlist = async () => {
            if (user && user._id) {
                try {
                    const response = await fetch(`http://localhost:5000/wishlist/${user._id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    if (!response.ok) throw new Error('Failed to fetch wishlist.');
                    const data = await response.json();

                   
                    const uniqueWishlist = Array.from(new Set(data.map(item => item.productId)))
                        .map(id => data.find(item => item.productId === id));

                    setWishlist(uniqueWishlist); 
                } catch (err) {
                    console.error('Error fetching wishlist:', err.message);
                }
            }
        };

        fetchWishlist();
    }, [user]); 

    const handleProductClick = (id) => {
        navigate(`/productdetails/${id}`);
    };

    const handleWishlistToggle = async (product) => {
        if (!user || !user._id) {
            alert('You must be logged in to add items to your wishlist.');
            navigate('/signin');
            return;
        }

        const wishlistItem = wishlist.find(item => item.productId === product._id);

        try {
            if (wishlistItem) {
                
                const response = await fetch(`http://localhost:5000/wishlist/remove/${wishlistItem._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json(); 
                    throw new Error(`Failed to remove item from wishlist: ${errorData.message}`);
                }

                
                setWishlist(prev => prev.filter(item => item.productId !== product._id));
                console.log(`Removed from wishlist: ${product.name}`);
            } else {
                
                const response = await fetch('http://localhost:5000/wishlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ userId: user._id, productId: product._id }),
                });

                if (!response.ok) {
                    const errorData = await response.json(); 
                    throw new Error(`Failed to add item to wishlist: ${errorData.message}`);
                }

                const data = await response.json();
                setWishlist(prev => [...prev, data]); 
                console.log(`Added to wishlist: ${product.name}`);
            }
        } catch (error) {
            console.error('Error updating wishlist:', error.message);
            alert(`Error: ${error.message}`); 
        }
    };

    
    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="product-page">
            <h1>Our Bakery Products</h1>
            {Object.keys(groupedProducts).map(category => (
                <div key={category}>
                    <h2 className="category-title">{category}</h2>
                    <div className="product-grid">
                        {groupedProducts[category].map(product => (
                            <div key={product._id} className="product-item" onClick={() => handleProductClick(product._id)}>
                                <img src={product.image} alt={product.name} />
                                <h2>{product.name}</h2>
                                <p>Price: ${product.new_price}</p>
                                <div className="wishlist" onClick={(e) => { 
                                        e.stopPropagation(); 
                                        handleWishlistToggle(product);
                                    }}>
                                    {wishlist.forEach(item => item.productId == product._id) ? (
                                        <HeartFilled color="red" size="2rem" /> 
                                    ) : (
                                        <HeartOutline color="gray" size="2rem" /> 
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductPage;
