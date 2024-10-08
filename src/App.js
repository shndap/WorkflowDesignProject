import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CustomSidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import NotImplementedYet from './components/NotImplementedYet/NotImplementedYet';
import TaskMenu from "./components/TaskMenu/TaskMenu";
import './App.css';
import Dashboard from "./components/Dashboard/Dashboard";
import Issues from "./components/Issues/Issues";

function App() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <Router>
            <div className="app-container">
                <CustomSidebar collapsed={collapsed} toggleSidebar={toggleSidebar}/>
                <div className="main-content">
                    <Header collapsed={collapsed}/>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/" element={<Home/>}/> {/* Default route */}
                        <Route path="/not-implemented-yet" element={<NotImplementedYet/>}/> {/* Default route */}
                        <Route path="/task-details" element={<TaskMenu/>}/>
                        <Route path="/issues" element={<Issues/>}/>
                        {/*<Route path="/dashboard" element={<AppTest/>}/>*/}
                        {/* Add other routes here */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
