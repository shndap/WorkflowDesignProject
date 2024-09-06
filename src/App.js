import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import NotImplementedYet from './components/NotImplementedYet/NotImplementedYet';
import './App.css';

function App() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <Router>
            <div className="app-container">
                <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
                <div className="main-content">
                    <Header collapsed={collapsed} />
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/" element={<Home />} /> {/* Default route */}
                        <Route path="/not-implemented-yet" element={<NotImplementedYet />} /> {/* Default route */}
                        {/* Add other routes here */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
