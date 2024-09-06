// Header.js
import React, { useState, useEffect } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        // Assuming you have a way to detect sidebar collapse from the sidebar component
        const handleResize = () => {
            const sidebar = document.querySelector('.sidebar');
            setSidebarCollapsed(sidebar.classList.contains('collapsed'));
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`header ${sidebarCollapsed ? 'header-collapsed' : ''}`}>
            <div className={`search-bar ${sidebarCollapsed ? 'search-bar-collapsed' : ''}`}>
                <input type="text" placeholder="Search..." />
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
            <div className="icons">
                <FontAwesomeIcon icon={faBell} className="icon" />
                <FontAwesomeIcon icon={faUser} className="icon" />
                <FontAwesomeIcon icon={faCog} className="icon" />
            </div>
        </div>
    );
}

export default Header;
