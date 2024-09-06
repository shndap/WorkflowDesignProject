// src/components/Home/Home.js
import React from 'react';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the Dashboard App</h1>
            <p className="home-description">
                This is the default landing page. Navigate to different sections using the sidebar.
            </p>
        </div>
    );
};

export default Home;
