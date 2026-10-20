# Bakery E-Commerce Website (MERN Stack)

A full-stack e-commerce web application for a bakery, built with **MongoDB, Express.js, React and Node.js**. Customers can browse products, manage a cart and place orders, while admins manage products, inventory and order fulfilment through a separate admin panel.

<!-- TODO: Add a live demo link if you deploy it (Render / Vercel / Netlify) -->
**Live Demo:** https://ecommerec-project-bakery-psi.vercel.app/

---

## Screenshots

<!-- TODO: Add 3-4 screenshots in a /screenshots folder and update the paths below. This is the single most valuable thing for recruiters. -->

| Home Page | Product Page |
|-----------|--------------|
| ![Home](<img width="1906" height="881" alt="Screenshot 2026-10-20 215553" src="https://github.com/user-attachments/assets/f427598e-dc40-495c-a645-a05642499eda" />
) | ![Product](<img width="1887" height="852" alt="Screenshot 2026-10-20 215725" src="https://github.com/user-attachments/assets/685f011d-8204-4e96-b511-bd3ffc79b7ea" />
) |

| Cart & Checkout | Admin Dashboard |
|-----------------|-----------------|
| ![Cart](<img width="1917" height="881" alt="Screenshot 2026-10-20 215816" src="https://github.com/user-attachments/assets/e3dcd41b-5548-4f1e-93a0-e71cbf758c45" />
) | ![Admin](<img width="1917" height="831" alt="Screenshot 2026-10-20 220112" src="https://github.com/user-attachments/assets/e57e9e25-5f9b-461d-a9c1-9ef0cdf84bc9" />
) |

---

## Features

### Customer side
- **Product catalog**: browse breads, cakes, pastries and seasonal items with images, descriptions and prices
- **Shopping cart**: add items, update quantities, remove items
- **Checkout & payment**: place orders with payment integration
- **User accounts**: register, log in 
- **Responsive design**: works on desktop, tablet and mobile

### Admin side
- **Role-based access**: only admins can reach the admin panel
- **Product management**: add, edit and delete products
- **Order management**: view all orders and update their status
- **Inventory/sales overview**: keep track of what is selling

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, CSS , HTML <!-- add: React Router, Axios, Redux/Context, Tailwind/Bootstrap if used --> |
| Admin Panel | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JWT<!-- JWT / bcrypt, if used --> |
| Payments | Stripe<!-- Stripe / Razorpay, if used --> |

---

## 📁 Project Structure


EcommerecProject-Bakery/
├── frontend/   # Customer-facing React app
├── admin/      # Admin dashboard (React)
├── backend/    # Node.js + Express REST API
└── README.md


---

##  Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) (local install or a free MongoDB Atlas cluster)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/annajohnson58/EcommerecProject-Bakery.git
cd EcommerecProject-Bakery
```

### 2. Set up the backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
# Add payment keys here if used, e.g. STRIPE_SECRET_KEY=your_key
```

Start the server:
```bash
npm start
```

### 3. Set up the frontend
```bash
cd ../frontend
npm install
npm start
```

### 4. Set up the admin panel
```bash
cd ../admin
npm install
npm start
```

> **Note:** If your scripts differ (for example `npm run dev`), update the commands above to match each folder's `package.json`.

---



## What I Learned

- Building a complete **MERN** application from scratch, including a separate admin interface
- Designing a **REST API** with Express and structuring data with **Mongoose** schemas
- Implementing **authentication and role-based authorisation**
- Managing application state and **cart logic** in React
- Handling **order flow and payment integration**
- Using **Git and GitHub** for version control across 30+ commits

---




⭐ If you found this project useful, feel free to star the repo!
