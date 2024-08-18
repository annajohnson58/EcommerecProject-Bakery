


import React, { useEffect, useState, useMemo } from 'react';
import { FaTrash } from 'react-icons/fa';
import './orders.css';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/orders');
                if (!response.ok) throw new Error('Failed to fetch orders');
                const data = await response.json();
                setOrders(data);
                await fetchProducts(data); 
                await sendStatistics(data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const fetchProducts = async (orders) => {
        const productIds = [...new Set(orders.flatMap(order => order.items.map(item => item.productId._id)))];
        console.log("Fetching products for IDs:", productIds); // Debugging line

        try {
            const response = await fetch(`http://localhost:5000/products?ids=${productIds.join(',')}`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const productData = await response.json();
            console.log("Fetched product data:", productData); // Debugging line

            const productMap = productData.reduce((acc, product) => {
                acc[product._id] = product.new_price; // Use new_price field from the product
                return acc;
            }, {});

            console.log("Product Map:", productMap); // Debugging line
            setProducts(productMap);
        } catch (err) {
            setError(err.message);
        }
    };

    const sendStatistics = async (orders) => {
        const deliveredOrders = orders.filter(order => order.orderStatus.toLowerCase() === 'delivered');
        const totalDelivered = deliveredOrders.length;
        const totalRevenue = deliveredOrders.reduce((acc, order) => acc + order.total, 0).toFixed(2);
        const deliveredByDay = Array(7).fill(0);
        const revenueByDay = Array(7).fill(0);
        const deliveredByCategory = {};

        deliveredOrders.forEach(order => {
            const date = new Date(order.createdAt);
            const day = date.getDay();
            deliveredByDay[day]++;
            revenueByDay[day] += order.total;

            order.items.forEach(item => {
                const category = item.productId.category; // Assuming productId has a category property
                if (!deliveredByCategory[category]) {
                    deliveredByCategory[category] = 0;
                }
                deliveredByCategory[category] += item.quantity;
            });
        });

        const stats = {
            totalDelivered,
            totalRevenue,
            deliveredByDay,
            revenueByDay,
            deliveredByCategory // Add delivered products by category to the stats
        };

        try {
            const response = await fetch('http://localhost:5000/dashboard/statistics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stats),
            });

            if (!response.ok) throw new Error('Failed to send statistics');
            console.log('Statistics sent successfully');

            await sendTopProducts(deliveredOrders); // Send top products after sending statistics
        } catch (error) {
            console.error('Error sending statistics:', error);
        }
    };

    const sendTopProducts = async (deliveredOrders) => {
        if (deliveredOrders.length === 0) {
            console.log("No delivered orders found. Skipping top products calculation.");
            return;
        }

        const productStats = {};

        deliveredOrders.forEach(order => {
            order.items.forEach(item => {
                const productId = item.productId._id; 
                const productName = item.productId.name; 
                const productQuantity = item.quantity;
                const productPrice = item.productId.new_price;
                const productImage=item.productId.image;

                console.log(`Processing Product ID: ${productId}, Quantity: ${productQuantity}, Price: ${productPrice}`); // Debugging line

                if (productPrice !== undefined) {
                    const productTotal = productPrice * productQuantity;

                    if (!productStats[productId]) {
                        productStats[productId] = {
                            name: productName,
                            totalQuantity: 0,
                            totalRevenue: 0,
                            image:productImage,
                        };
                    }
                    productStats[productId].totalQuantity += productQuantity;
                    productStats[productId].totalRevenue += productTotal;
                } else {
                    console.error(`Price not found for product ID ${productId}`);
                }
            });
        });

        const sortedProducts = Object.values(productStats)
            .sort((a, b) => b.totalQuantity - a.totalQuantity)
            .slice(0, 5);

        if (sortedProducts.length > 0) {
            try {
                const response = await fetch('http://localhost:5000/dashboard/top-products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(sortedProducts),
                });

                if (!response.ok) throw new Error('Failed to send top products');
                console.log('Top products sent successfully');
            } catch (error) {
                console.error('Error sending top products:', error);
            }
        } else {
            console.log("No top products to send.");
        }
    };

    const updateOrderStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/orders/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error('Failed to update order status');
            const updatedOrder = await response.json();
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order._id === id ? { ...order, ...updatedOrder } : order
                )
            );

            // Optionally refresh top products after updating order status
            await sendTopProducts(orders.filter(order => order.orderStatus.toLowerCase() === 'delivered'));
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteOrder = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this order?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete order');
            setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const userName = order.userId?.username;
            const matchesSearchTerm = userName && userName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || order.orderStatus.toLowerCase() === activeCategory.toLowerCase();
            return (matchesSearchTerm || !searchTerm) && matchesCategory;
        });
    }, [orders, searchTerm, activeCategory]);

    const deliveredOrders = orders.filter(order => order.orderStatus.toLowerCase() === 'delivered');
    const totalDelivered = deliveredOrders.length;
    const totalRevenue = deliveredOrders.reduce((acc, order) => acc + order.total, 0).toFixed(2);
    const averagePrice = totalDelivered > 0 ? (totalRevenue / totalDelivered).toFixed(2) : 0;

    const deliveredByDay = useMemo(() => {
        const daysCount = Array(7).fill(0);
        const revenueByDay = Array(7).fill(0);

        deliveredOrders.forEach(order => {
            const date = new Date(order.createdAt);
            const day = date.getDay();
            daysCount[day]++;
            revenueByDay[day] += order.total;
        });

        return { daysCount, revenueByDay };
    }, [deliveredOrders]);

    const productsDeliveredByCategory = useMemo(() => {
        const categoryCounts = {};
        
        deliveredOrders.forEach(order => {
            order.items.forEach(item => {
                const category = item.productId.category; // Assuming productId has a category property
                if (!categoryCounts[category]) {
                    categoryCounts[category] = 0;
                }
                categoryCounts[category] += item.quantity;
            });
        });

        return categoryCounts;
    }, [deliveredOrders]);

    const productDeliveryStats = useMemo(() => {
        const productStats = {};

        deliveredOrders.forEach(order => {
            order.items.forEach(item => {
                const productId = item.productId._id; 
                const productName = item.productId.name; 
                const productQuantity = item.quantity;
                const productPrice = products[productId];

                if (productPrice !== undefined) {
                    const productTotal = productPrice * productQuantity;

                    if (!productStats[productId]) {
                        productStats[productId] = {
                            name: productName,
                            totalQuantity: 0,
                            totalRevenue: 0,
                        };
                    }
                    productStats[productId].totalQuantity += productQuantity;
                    productStats[productId].totalRevenue += productTotal;
                } else {
                    console.error(`Price not found for product ID ${productId}`);
                }
            });
        });

        const sortedProducts = Object.values(productStats).sort((a, b) => b.totalQuantity - a.totalQuantity);

        return sortedProducts.slice(0, 5);
    }, [deliveredOrders, products]);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='orders'>
            <ul className='nav-menu' style={{fontSize:'20px'}}>
                {['All', 'Pending', 'Shipped', 'Delivered','Cancelled'].map(category => (
                    <li key={category} onClick={() => handleCategoryChange(category)}>
                        {category}
                        {activeCategory === category && <hr />}
                    </li>
                ))}
            </ul>

            <div className="content">
                <h2>{activeCategory} Orders</h2>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width:'400px' }}
                    aria-label="Search orders"
                />
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className='orders-table'>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Shipping Info</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.userId?.username || "Unknown"}</td>
                                <td>{order.userId?.email || "N/A"}</td>
                                <td>
                                    <div>{order.shippingInfo?.name || "N/A"}</div>
                                    <div>{order.shippingInfo?.address || ""}</div>
                                    <div>{order.shippingInfo?.city}, {order.shippingInfo?.postalCode}, {order.shippingInfo?.country}, {order.shippingInfo?.phoneNumber}</div>
                                </td>
                                <td>
                                    {order.items.map(item => (
                                        <div key={item.productId} style={{display:'flex',flexDirection:'row'}}>{item.productId.name} <p style={{color:'red'}}>(x{item.quantity})</p></div>
                                    ))}
                                </td>
                                <td>${order.total.toFixed(2)}</td>
                                <td>
                                    <span className={`status-label ${order.orderStatus.toLowerCase()}`}>
                                        {order.orderStatus}
                                    </span>
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                    >
                                        {['Pending', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                                            <option key={status} value={status.toLowerCase()}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                <FaTrash
                                                className="fa-trash"
                                                onClick={() => deleteOrder(order._id)}
                                            />
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

           
        </div>
    );
};

export default Order;
