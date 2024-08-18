
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

import './checkout.css';
import { useUser } from '../../context/UserContext';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';

const stripePromise = loadStripe('pk_test_51PjybbBepjmvH9tzhr4zEWHJqB7FALhH1snqewOk4u9EujMfHq0cqMfe94d96E9jeSFCujfAb89M3cPYq6OVjAya00uePGjGhq');

const Checkout = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [cartItems, setCartItems] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        email: '',
        phoneNumber: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [paymentError, setPaymentError] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const [submitError, setSubmitError] = useState(null); // Error state for submission
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (!user) {
            alert("You must be logged in to place an order.");
            navigate('/signin');
        } else {
            fetchCartItems();
        }
    }, [user, navigate]);

    const fetchCartItems = async () => {
        if (!user || !user._id) {
            console.error("User is not logged in or user ID is undefined.");
            return;
        }

        const response = await fetch(`http://localhost:5000/cart/${user._id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } // Assuming token is stored in local storage
        });
        
        if (!response.ok) {
            console.error("Failed to fetch cart items");
            return;
        }

        const data = await response.json();
        console.log("Fetched Cart Items: ", data);
        setCartItems(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, cartItem) => {
            return total + cartItem.items.reduce((itemTotal, item) => {
                return itemTotal + (item.productId?.new_price || 0) * item.quantity;
            }, 0);
        }, 0);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const orderAmount = calculateTotal();
    
    //     if (cartItems.length === 0) {
    //         alert("Your cart is empty. Please add items to your cart before checking out.");
    //         return;
    //     }
    
    //     setLoading(true);
    //     setSubmitError(null);
    
    //     try {
    //         const response = await fetch('http://localhost:5000/checkout', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 paymentMethod,
    //                 amount: orderAmount * 100,
    //                 shippingInfo,
    //                 userId: user._id,
    //             }),
    //         });
    
    //         const data = await response.json();
    //         console.log("Checkout Response: ", data);
    
    //         if (data.success) {
    //             navigate('/order-confirmation', { state: { orderId: data.orderDetails._id } }); // Pass the order ID
    //         } else {
    //             alert(`Order failed: ${data.error}`);
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         alert('An error occurred while processing your order.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderAmount = calculateTotal();
    
        if (cartItems.length === 0) {
            alert("Your cart is empty. Please add items to your cart before checking out.");
            return;
        }
    
        if (!user || !user._id) {
            alert("You must be logged in to place an order.");
            return; // Exit early if user is not defined or does not have an _id
        }
    
        setLoading(true);
        setSubmitError(null);
    
        try {
            // If payment method is cash on delivery
            if (paymentMethod === 'cash') {
                // Directly create the order without payment processing
                const orderResponse = await fetch('http://localhost:5000/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentMethod,
                        amount: orderAmount * 100, // You might want to track the amount for records
                        shippingInfo,
                        userId: user._id,
                    }),
                });
    
                const orderData = await orderResponse.json();
                console.log("Order Response: ", orderData);
    
                if (!orderData.success) {
                    throw new Error(orderData.error);
                }
    
                // Navigate to order confirmation page
                navigate('/order-confirmation', { state: { orderId: orderData.orderDetails._id } });
            } else {
                // Proceed with card payment
                const response = await fetch('http://localhost:5000/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentMethod,
                        amount: orderAmount * 100,
                        shippingInfo,
                        userId: user._id,
                    }),
                });
    
                const data = await response.json();
                console.log("Checkout Response: ", data);
    
                if (!data.success) {
                    throw new Error(data.error);
                }
    
                const { clientSecret } = data;
    
                // Confirm the payment on the client side
                const cardElement = elements.getElement(CardElement);
                const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: shippingInfo.name,
                            email: shippingInfo.email,
                        },
                    },
                });
    
                if (paymentResult.error) {
                    // Show error to your customer
                    setPaymentError(paymentResult.error.message);
                    alert(`Payment failed: ${paymentResult.error.message}`);
                } else {
                    // Payment succeeded
                    if (paymentResult.paymentIntent.status === 'succeeded') {
                        navigate('/order-confirmation', { state: { orderId: data.orderDetails._id } });
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your order.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <section className="shipping-info-section">
                    <h2>Shipping Information</h2>
                    {Object.keys(shippingInfo).map((key) => (
                        <div key={key}>
                            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <input
                                type={key === 'email' ? 'email' : 'text'}
                                id={key}
                                name={key}
                                value={shippingInfo[key]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                </section>
                <section className="order-summary-section">
                    <h2>Order Summary</h2>
                    <ul className="order-items-list">
                        {cartItems.map(cartItem => (
                            cartItem.items.map(item => (
                        
                            <li key={item.productId} className="order-item">
                                <span className="item-name">{item.productId.name}</span>
                                <span className="item-price">${item.productId.new_price.toFixed(2)}</span>
                                <span className="item-quantity">x {item.quantity}</span>
                            </li>
                        ))))}
                    </ul>
                    <h3 className="total-amount">
                        Total: <strong>${calculateTotal().toFixed(2)}</strong>
                    </h3>
                </section>
                <h2>Payment Information</h2>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                        />
                        Credit/Debit Card
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="cash"
                            checked={paymentMethod === 'cash'}
                            onChange={() => setPaymentMethod('cash')}
                        />
                        Cash on Delivery
                    </label>
                </div>

                {paymentMethod === 'card' && (
                    <div>
                        <CardElement onChange={(e) => setPaymentError(e.error ? e.error.message : null)} />
                        {paymentError && <div style={{ color: 'red' }}>{paymentError}</div>}
                    </div>
                )}
                
                <button type="submit" className="checkout-button" disabled={loading}>
                    {loading ? 'Processing...' : 'Place Order'}
                </button>
            </form>
            {submitError && <div style={{ color: 'red' }}>{submitError}</div>}
        </div>
    );
};

const CheckoutWithStripe = () => (
    <Elements stripe={stripePromise}>
        <Checkout />
    </Elements>
);

export default CheckoutWithStripe;
