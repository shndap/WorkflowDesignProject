import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
    faTachometerAlt,
    faList,
    faTasks,
    faUsers,
    faFileAlt,
    faCogs
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png'; // Adjust the path to your logo image
import './Sidebar.css';

function CustomSidebar() {
    const [collapsed, setCollapsed] = useState(true);

    const handleCollapseToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Sidebar collapsed={collapsed} backgroundColor={'#2c3e50'} >
            <div className="logo-container" onClick={handleCollapseToggle}>
                <img src={logo} alt="Logo" className={`logo-img ${collapsed ? 'collapsed' : ''}`} style={{ width: '25px', height: '25px' }} />
            </div>
            <Menu iconShape="circle">
                <MenuItem
                    className='pro-menu-item'
                    icon={<FontAwesomeIcon icon={faTachometerAlt} />}
                    component={<Link to="/dashboard" />}
                    onClick={handleCollapseToggle}
                >
                    Dashboard
                </MenuItem>
                <MenuItem
                    className='pro-menu-item'
                    icon={<FontAwesomeIcon icon={faList} />}
                    component={<Link to="/issues" />}
                    onClick={handleCollapseToggle}
                >
                    Issues
                </MenuItem>
                <MenuItem
                    className='pro-menu-item'
                    icon={<FontAwesomeIcon icon={faTasks} />}
                    component={<Link to="/not-implemented-yet" />}
                    onClick={handleCollapseToggle}
                >
                    Tasks
                </MenuItem>
                <MenuItem
                    className='pro-menu-item'
                    icon={<FontAwesomeIcon icon={faUsers} />}
                    component={<Link to="/not-implemented-yet" />}
                    onClick={handleCollapseToggle}
                >
                    Employers
                </MenuItem>
                <MenuItem
                    className='pro-menu-item'
                    icon={<FontAwesomeIcon icon={faFileAlt} />}
                    component={<Link to="/not-implemented-yet" />}
                    onClick={handleCollapseToggle}
                >
                    Reports
                </MenuItem>
                <MenuItem
                    className='pro-menu-item'
                    icon={<FontAwesomeIcon icon={faCogs} />}
                    component={<Link to="/not-implemented-yet" />}
                    onClick={handleCollapseToggle}
                >
                    Diagram
                </MenuItem>
            </Menu>
        </Sidebar>
    );
}

export default CustomSidebar;
