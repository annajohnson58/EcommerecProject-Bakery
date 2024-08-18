
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './orderConfirmation.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const { orderId } = location.state || {};
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderId) {
                setError('No order ID provided.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/orders/order/${orderId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Fixed quotation marks
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }

                const data = await response.json();
                setOrderDetails(data.order); // Make sure to set the correct property
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    // Check if orderDetails is present and has items
    if (!orderDetails || !Array.isArray(orderDetails.items)) {
        return <div>No order items found.</div>;
    }

    return (
        <div className="order-confirmation-container">
            <h1 className="thank-you-message">Thank You for Your Order!</h1>
            <div className="order-summary">
                <h2 className="summary-title">Order Summary:</h2>
                <ul className="order-items-list">
                    {orderDetails.items.map(item => (
                        <li key={item.productId} className="order-item">
                            <span className="item-name">{item.productId.name}</span>
                            <span className="item-price">${item.productId.new_price.toFixed(2)}</span>
                            <span className="item-quantity">x {item.quantity}</span>
                        </li>
                    ))}
                </ul>
                <h3 className="total-amount">
                    Total: <strong>${orderDetails.total.toFixed(2)}</strong>
                </h3>
                <p className="order-number">Your order number is: <strong>{orderDetails.orderId}</strong></p>
            </div>
            <p className="appreciation-note">Thank you for choosing us! We value your business and hope you enjoy your purchase.</p>
        </div>
    );
};

export default OrderConfirmation;