// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaHeart as HeartFilled } from 'react-icons/fa';
// import { FaRegHeart as HeartOutline } from 'react-icons/fa';
// import { useUser } from '../../context/UserContext';
// import './products.css';

// const ProductPage = () => {
//     const navigate = useNavigate();
//     const { user } = useUser();
    
//     const [products, setProducts] = useState([]);
//     const [wishlist, setWishlist] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch products on component mount
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/products');
//                 if (!response.ok) throw new Error('Failed to fetch products.');
//                 const data = await response.json();
//                 setProducts(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     // Fetch wishlist when user changes
//     useEffect(() => {
//         const fetchWishlist = async () => {
//             if (user && user._id) {
//                 try {
//                     const response = await fetch(`http://localhost:5000/wishlist/${user._id}`, {
//                         headers: {
//                             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                         },
//                     });
//                     if (!response.ok) throw new Error('Failed to fetch wishlist.');
//                     const data = await response.json();

//                     // Remove duplicates based on productId
//                     const uniqueWishlist = Array.from(new Set(data.map(item => item.productId)))
//                         .map(id => data.find(item => item.productId === id));

//                     setWishlist(uniqueWishlist); // Set the unique wishlist state
//                     console.log('Fetched Wishlist:', uniqueWishlist); // Debugging log
//                 } catch (err) {
//                     console.error('Error fetching wishlist:', err.message);
//                 }
//             }
//         };

//         fetchWishlist();
//     }, [user]); // Runs when user changes

//     const handleProductClick = (id) => {
//         navigate(`/productdetails/${id}`);
//     };

//     const handleWishlistToggle = async (product) => {
//         if (!user || !user._id) {
//             alert('You must be logged in to add items to your wishlist.');
//             navigate('/signin');
//             return;
//         }
    
//         const wishlistItem = wishlist.find(item => item.productId === product._id);
    
//         try {
//             if (wishlistItem) {
                
//                 alert(`${product.name} is already in your wishlist!`);
                
//                 return; // Early return to prevent adding again
//             }
    
//             const response = await fetch('http://localhost:5000/wishlist', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({ userId: user._id, productId: product._id }),
//             });
    
//             if (!response.ok) {
//                 const errorData = await response.json(); // Capture the error response
//                 throw new Error(`Failed to add item to wishlist: ${errorData.message}`);
//             }
    
//             const data = await response.json();
//             setWishlist(prev => [...prev, data]); // Add new wishlist item to state
//             console.log(`Added to wishlist: ${product.name}`);
//         } catch (error) {
//             console.error('Error updating wishlist:', error.message);
//             alert(`Error: ${error.message}`); // Show user-friendly error message
//         }
//     };
//     // Group products by category
//     const groupedProducts = products.reduce((acc, product) => {
//         if (!acc[product.category]) {
//             acc[product.category] = [];
//         }
//         acc[product.category].push(product);
//         return acc;
//     }, {});

//     if (loading) return <p>Loading products...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className="product-page">
//             <h1>Our Bakery Products</h1>
//             {Object.keys(groupedProducts).map(category => (
//                 <div key={category}>
//                     <h2 className="category-title">{category}</h2>
//                     <div className="product-grid">
//                         {groupedProducts[category].map(product => (
//                             <div key={product._id} className="product-item" onClick={() => handleProductClick(product._id)}>
//                                 <img src={product.image} alt={product.name} />
//                                 <h2>{product.name}</h2>
//                                 <p>Price: ${product.new_price}</p>
//                                 <div className="wishlist" onClick={(e) => { 
//                                         e.stopPropagation(); // Prevent triggering product click
//                                         handleWishlistToggle(product);
//                                     }}>
//                                     {wishlist.some(item => item.productId === product._id) ? (
                                   
//                                         <HeartFilled color="red" size="2rem" /> // Filled heart when in wishlist
//                                     ) : (
//                                         <HeartOutline color="gray" size="2rem" /> // Outline heart when not in wishlist
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ProductPage;
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaHeart as HeartFilled } from 'react-icons/fa';
// import { FaRegHeart as HeartOutline } from 'react-icons/fa';
// import { useUser } from '../../context/UserContext';
// import './products.css';

// const ProductPage = () => {
//     const navigate = useNavigate();
//     const { user } = useUser();

//     const [products, setProducts] = useState([]);
//     const [wishlist, setWishlist] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch products on component mount
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/products');
//                 if (!response.ok) throw new Error('Failed to fetch products.');
//                 const data = await response.json();
//                 setProducts(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     // Fetch wishlist when user changes
//     useEffect(() => {
//         const fetchWishlist = async () => {
//             if (user && user._id) {
//                 try {
//                     const response = await fetch(`http://localhost:5000/wishlist/${user._id}`, {
//                         headers: {
//                             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                         },
//                     });
//                     if (!response.ok) throw new Error('Failed to fetch wishlist.');
//                     const data = await response.json();

//                     // Remove duplicates based on productId
//                     const uniqueWishlist = Array.from(new Set(data.map(item => item.productId)))
//                         .map(id => data.find(item => item.productId === id));

//                     setWishlist(uniqueWishlist); // Set the unique wishlist state
//                 } catch (err) {
//                     console.error('Error fetching wishlist:', err.message);
//                 }
//             }
//         };

//         fetchWishlist();
//     }, [user]); // Runs when user changes

//     const handleProductClick = (id) => {
//         navigate(`/productdetails/${id}`);
//     };

//     const handleWishlistToggle = async (product) => {
//         if (!user || !user._id) {
//             alert('You must be logged in to add items to your wishlist.');
//             navigate('/signin');
//             return;
//         }

//         const wishlistItem = wishlist.find(item => item.productId === product._id);

//         try {
//             if (wishlistItem) {
//                 // If the item is already in the wishlist, remove it
//                 const response = await fetch(`http://localhost:5000/wishlist/remove/${wishlistItem._id}`, {
//                     method: 'DELETE',
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json(); // Capture the error response
//                     throw new Error(`Failed to remove item from wishlist: ${errorData.message}`);
//                 }

//                 // Update the wishlist state by filtering out the removed item
//                 setWishlist(prev => prev.filter(item => item.productId !== product._id));
//                 console.log(`Removed from wishlist: ${product.name}`);
//             } else {
//                 // If the item is not in the wishlist, add it
//                 const response = await fetch('http://localhost:5000/wishlist', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     },
//                     body: JSON.stringify({ userId: user._id, productId: product._id }),
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json(); // Capture the error response
//                     throw new Error(`Failed to add item to wishlist: ${errorData.message}`);
//                 }

//                 const data = await response.json();
//                 setWishlist(prev => [...prev, data]); // Add new wishlist item to state
//                 console.log(`Added to wishlist: ${product.name}`);
//             }
//         } catch (error) {
//             console.error('Error updating wishlist:', error.message);
//             alert(`Error: ${error.message}`); // Show user-friendly error message
//         }
//     };

//     // Group products by category
//     const groupedProducts = products.reduce((acc, product) => {
//         if (!acc[product.category]) {
//             acc[product.category] = [];
//         }
//         acc[product.category].push(product);
//         return acc;
//     }, {});

//     if (loading) return <p>Loading products...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className="product-page">
//             <h1>Our Bakery Products</h1>
//             {Object.keys(groupedProducts).map(category => (
//                 <div key={category}>
//                     <h2 className="category-title">{category}</h2>
//                     <div className="product-grid">
//                         {groupedProducts[category].map(product => (
//                             <div key={product._id} className="product-item" onClick={() => handleProductClick(product._id)}>
//                                 <img src={product.image} alt={product.name} />
//                                 <h2>{product.name}</h2>
//                                 <p>Price: ${product.new_price}</p>
//                                 <div className="wishlist" onClick={(e) => { 
//                                         e.stopPropagation(); // Prevent triggering product click
//                                         handleWishlistToggle(product);
//                                     }}>
//                                     {wishlist.some(item => item.productId === product._id) ? (
//                                         <HeartFilled color="red" size="2rem" /> // Filled heart when in wishlist
//                                     ) : (
//                                         <HeartOutline color="gray" size="2rem" /> // Outline heart when not in wishlist
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ProductPage;
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

    // Fetch products on component mount
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

    // Fetch wishlist when user changes
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

                    // Remove duplicates based on productId
                    const uniqueWishlist = Array.from(new Set(data.map(item => item.productId)))
                        .map(id => data.find(item => item.productId === id));

                    setWishlist(uniqueWishlist); // Set the unique wishlist state
                } catch (err) {
                    console.error('Error fetching wishlist:', err.message);
                }
            }
        };

        fetchWishlist();
    }, [user]); // Runs when user changes

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
                // If the item is already in the wishlist, remove it
                const response = await fetch(`http://localhost:5000/wishlist/remove/${wishlistItem._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json(); // Capture the error response
                    throw new Error(`Failed to remove item from wishlist: ${errorData.message}`);
                }

                // Update the wishlist state by filtering out the removed item
                setWishlist(prev => prev.filter(item => item.productId !== product._id));
                console.log(`Removed from wishlist: ${product.name}`);
            } else {
                // If the item is not in the wishlist, add it
                const response = await fetch('http://localhost:5000/wishlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ userId: user._id, productId: product._id }),
                });

                if (!response.ok) {
                    const errorData = await response.json(); // Capture the error response
                    throw new Error(`Failed to add item to wishlist: ${errorData.message}`);
                }

                const data = await response.json();
                setWishlist(prev => [...prev, data]); // Add new wishlist item to state
                console.log(`Added to wishlist: ${product.name}`);
            }
        } catch (error) {
            console.error('Error updating wishlist:', error.message);
            alert(`Error: ${error.message}`); // Show user-friendly error message
        }
    };

    // Group products by category
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
                                        e.stopPropagation(); // Prevent triggering product click
                                        handleWishlistToggle(product);
                                    }}>
                                    {wishlist.forEach(item => item.productId == product._id) ? (
                                        <HeartFilled color="red" size="2rem" /> // Filled heart when in wishlist
                                    ) : (
                                        <HeartOutline color="gray" size="2rem" /> // Outline heart when not in wishlist
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
