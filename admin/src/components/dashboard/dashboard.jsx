
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import sales_icon from '../../assets/sales1.png';
import income_icon from '../../assets/in.png';
import users_icon from '../../assets/user.png';
import products_icon from '../../assets/cost.png';

import './dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [registrations, setRegistrations] = useState({});
  const [totalLogins, setTotalLogins] = useState(0);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('http://localhost:5000/dashboard/data');
                if (!response.ok) throw new Error('Failed to fetch dashboard data');
                const fetchedData = await response.json();
                setData(fetchedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        const fetchRegistrationsByDay = async () => {
              try {
                const response = await fetch('http://localhost:5000/users/registrations-by-day');
                const data = await response.json();
                setRegistrations(data); // Directly set the array
              } catch (err) {
                console.error('Error fetching registrations by day:', err);
                setError('Failed to fetch registrations by day.');
              }
            };
          const fetchTotalLogins = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/total-registrations');
                const data = await response.json();
                setTotalLogins(data.totalRegistrations);
            } catch (err) {
                console.error('Error fetching total logins:', err);
                setError('Failed to fetch total logins.');
            } finally {
                setLoading(false);
            }
          };

        fetchDashboardData();
        fetchRegistrationsByDay();
        fetchTotalLogins();
    }, []);

    
    if (loading) return <p>Loading dashboard...</p>;
    if (error) return <p>Error: {error}</p>;

    
    const {
        totalStats = { deliveredByDay: [], revenueByDay: [], deliveredByCategory: {} }, // Default values
        topProducts = [], 
        totalProducts = 0, 
        
    } = data || {}; 

    
    const totalSalesChartData = {
        options: {
            chart: { id: 'total-sales-chart', toolbar: { show: false } },
            xaxis: { labels: { show: false }, categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
            yaxis: { labels: { show: false } },
            dataLabels: { enabled: false },
            fill: { colors: ['#BFF6C3'] },
            grid: { show: false },
            colors: ['green'],
        },
        series: [{ name: 'Total Sales', data: totalStats.deliveredByDay || [0, 0, 0, 0, 0, 0, 0] }],
    };

    const revenueChartData = {
        options: {
            chart: { id: 'revenue-chart', toolbar: { show: false } },
            xaxis: { labels: { show: false }, categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
            yaxis: { labels: { show: false } },
            dataLabels: { enabled: false },
            fill: { colors: ['#CAF4FF'] },
            grid: { show: false },
            colors: ['#5AB2FF'],
        },
        series: [{ name: 'Revenue', data: totalStats.revenueByDay || [0, 0, 0, 0, 0, 0, 0] }],
    };

    const UsersChartData = {
        options: {
            chart: { id: 'users-chart', toolbar: { show: false } },
            xaxis: { labels: { show: false }, categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
            yaxis: { labels: { show: false } },
            dataLabels: { enabled: false },
            fill: { colors: ['#CAF4FF'] },
            grid: { show: false },
            colors: ['#5AB2FF'],
        },
        series: [{ name: 'Users', data: registrations.length ? registrations : [0, 0, 0, 0, 0, 0, 0] }],
    };

    const saleByCategoryData = {
        options: {
            chart: { id: 'sale-by-category-chart', toolbar: { show: false } },
            labels: totalStats.deliveredByCategory ? Object.keys(totalStats.deliveredByCategory) : [],
            colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            legend: { position: 'bottom' },
        },
        series: totalStats.deliveredByCategory ? Object.values(totalStats.deliveredByCategory) : [0, 0, 0, 0, 0, 0],
    };

    return (
        <>
           
            <div className="app">
                <h1>Dashboard</h1>
                <div className="row">
                    <div className="card">
                        <div className="cardsub">
                            <img src={sales_icon} alt="Total Sales" />
                            <p>Total Sales</p>
                            <h2>{totalStats.totalDelivered || '0'}</h2>
                        </div>
                        <div className="mixed-chart">
                            <Chart options={totalSalesChartData.options} series={totalSalesChartData.series} type="area" height={150} />
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardsub">
                            <img src={income_icon} alt="Total Revenue" />
                            <p>Total Revenue</p>
                            <h2>${totalStats.totalRevenue || '0'}</h2>
                        </div>
                        <div className="mixed-chart1">
                            <Chart options={revenueChartData.options} series={revenueChartData.series} type="area" height={150} />
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardsub">
                            <img src={users_icon} alt="Total Users" />
                            <p>Total Users</p>
                            <h2>{totalLogins || '0'}</h2>
                        </div>
                        <div className="mixed-chart1">
                            <Chart options={UsersChartData.options} series={UsersChartData.series} type="area" height={150} />
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardsub">
                            <img src={products_icon} alt="Total Products" />
                            <p>Total Products</p>
                            <h2>{totalProducts || '0'}</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="products">
                        <h2>TOP PRODUCTS</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Sold</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.map(product => (
                                    <tr key={product.name}>
                                        <td>
                                            <img src={product.image} alt='' style={{ width: '50px' }} />&nbsp;{product.name}
                                        </td>
                                        <td>{product.totalQuantity}</td>
                                        <td>${product.totalRevenue.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="row4">
                        <div className="club1">
                            <h3>Sales By Category</h3>
                            <div className="pie-chart">
                                <Chart options={saleByCategoryData.options} series={saleByCategoryData.series} type="pie" height={300} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
