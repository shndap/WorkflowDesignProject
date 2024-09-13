// Sidebar.js
import React, {useState} from 'react';
import './Sidebar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {
    faTachometerAlt,
    faProjectDiagram,
    faTasks,
    faUsers,
    faFileAlt,
    faCogs,
    faList
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png'; // Adjust the path to your logo image

function Sidebar() {
    const [collapsed, setCollapsed] = useState(true);

    const handleCollapseToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="logo-container" onClick={handleCollapseToggle}>
                <img src={logo} alt="Logo" className={`logo-img ${collapsed ? 'collapsed' : ''}`}/>
            </div>
            <div className="menu">
                <div className={`menu-item ${collapsed ? 'collapsed' : ''}`}>
                    {collapsed ? (
                        <span className="icon">
                            <FontAwesomeIcon icon={faTachometerAlt}/>
                        </span>
                    ) : (
                        <Link to="/dashboard" className="menu-link" onClick={handleCollapseToggle}>
                            <FontAwesomeIcon icon={faTachometerAlt} className="icon"/>
                            <span className="text">Dashboard</span>
                        </Link>
                    )}
                </div>
                <div className={`menu-item ${collapsed ? 'collapsed' : ''}`}>
                    {collapsed ? (
                        <span className="icon">
                            <FontAwesomeIcon icon={faList}/>
                        </span>
                    ) : (
                        <Link to="/issues" className="menu-link" onClick={handleCollapseToggle}>
                            <FontAwesomeIcon icon={faList} className="icon"/>
                            <span className="text">Issues</span>
                        </Link>
                    )}
                </div>
                <div className={`menu-item ${collapsed ? 'collapsed' : ''}`}>
                    {collapsed ? (
                        <span className="icon">
                            <FontAwesomeIcon icon={faTasks}/>
                        </span>
                    ) : (
                        <Link to="/not-implemented-yet" className="menu-link" onClick={handleCollapseToggle}>
                            <FontAwesomeIcon icon={faTasks} className="icon"/>
                            <span className="text">Tasks</span>
                        </Link>
                    )}
                </div>
                <div className={`menu-item ${collapsed ? 'collapsed' : ''}`}>
                    {collapsed ? (
                        <span className="icon">
                            <FontAwesomeIcon icon={faUsers}/>
                        </span>
                    ) : (
                        <Link to="/not-implemented-yet" className="menu-link" onClick={handleCollapseToggle}>
                            <FontAwesomeIcon icon={faUsers} className="icon"/>
                            <span className="text">Employers</span>
                        </Link>
                    )}
                </div>
                <div className={`menu-item ${collapsed ? 'collapsed' : ''}`}>
                    {collapsed ? (
                        <span className="icon">
                            <FontAwesomeIcon icon={faFileAlt}/>
                        </span>
                    ) : (
                        <Link to="/not-implemented-yet" className="menu-link" onClick={handleCollapseToggle}>
                            <FontAwesomeIcon icon={faFileAlt} className="icon"/>
                            <span className="text">Reports</span>
                        </Link>
                    )}
                </div>
                <div className={`menu-item ${collapsed ? 'collapsed' : ''}`}>
                    {collapsed ? (
                        <span className="icon">
                            <FontAwesomeIcon icon={faCogs}/>
                        </span>
                    ) : (
                        <Link to="/not-implemented-yet" className="menu-link" onClick={handleCollapseToggle}>
                            <FontAwesomeIcon icon={faCogs} className="icon"/>
                            <span className="text">Camunda Integration</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
