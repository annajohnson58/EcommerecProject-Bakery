


import React, { useState, useEffect } from 'react';
import './addproduct.css';
import upload_area from '../../../assets/upload.svg';
import { useNavigate } from 'react-router-dom';

const Addproduct = () => {
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    // Load categories from local storage or set default categories
    const [categories, setCategories] = useState(() => {
        const savedCategories = localStorage.getItem('categories');
        return savedCategories ? JSON.parse(savedCategories) : ['cakes', 'dessert', 'pastries'];
    });
    const [newCategory, setNewCategory] = useState(''); // State to hold the new category input

    const [productdetails, setProductdetails] = useState({
        name: "",
        image: "",
        category: "",
        description: "",
        new_price: ""
    });

    const changeHandler = (e) => {
        setProductdetails({ ...productdetails, [e.target.name]: e.target.value });
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', productdetails.name);
        formData.append('category', productdetails.category);
        formData.append('description', productdetails.description);
        formData.append('new_price', productdetails.new_price);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setStatus(data.message);
                setProductdetails({
                    name: "",
                    image: "",
                    category: "",
                    description: "",
                    new_price: ""
                });
                setImage(null);
                navigate('/product');
            } else {
                setStatus('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error submitting product:', error);
            setStatus('Error submitting product');
        }
    };

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    // Function to add new category
    const addNewCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            const updatedCategories = [...categories, newCategory];
            setCategories(updatedCategories);
            setProductdetails({ ...productdetails, category: newCategory });
            localStorage.setItem('categories', JSON.stringify(updatedCategories)); // Save to local storage
            setNewCategory(''); // Clear the input field after adding
        }
    }

    useEffect(() => {
        // Load categories from local storage when component mounts
        const savedCategories = localStorage.getItem('categories');
        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        }
    }, []);

    return (
        <div className="class">
            <div className='add-product'>
                <div className="sub">
                    <h2>Add Product</h2>

                    <label style={{ display: 'flex', flexDirection: "column" }}>Product Title
                        <input value={productdetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
                    </label>
                    
                    <div className="addproduct-price">
                        <label> Price
                            <input value={productdetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
                        </label>
                    </div>
        
                    <label>Description
                        <input value={productdetails.description} onChange={changeHandler} type="text" name="description" placeholder='Type here' />
                    </label>

                    <p style={{fontWeight:'bold'}}>Product Category</p>
                    <select value={productdetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                        <option value="" disabled>Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>

                    
                    <div className="new-category-container">
                        <input 
                            type="text" 
                            placeholder="Add new category" 
                            value={newCategory} 
                            onChange={(e) => setNewCategory(e.target.value)} 
                        />
                        <button type="button" onClick={addNewCategory} className="add-category-button">Add Category</button>
                    </div>

                    <div className="addproduct-itemfield">
                        <label htmlFor="file-input">
                            <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
                        </label>
                        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
                    </div>

                    <button onClick={handleSubmit} className='addproduct-button'>ADD</button>
                </div>
                {status && <h4>{status}</h4>}
            </div>
        </div>
    );
};

export default Addproduct;