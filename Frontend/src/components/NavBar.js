import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function NavBar() {
    const token = localStorage.getItem('token');

    return (
        <header>
            <div id="logo">
                <Link to="/">
                    <img src={logo} alt="CARS4FUN Logo" style={{height: '50px'}}/>
                </Link>
            </div>
            <nav>
            <Link to="/news">News</Link>
                <Link to="/reviews">Reviews</Link>
                <Link to="/brands">Brands</Link>
                <Link to="/cars">Cars</Link>
            </nav>
            {token ? (
                <Link
                    to="/menu"
                    style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '14px', color: '#555' }}
                >
                    Menu
                </Link>
            ) : (
                <Link
                    to="/login"
                    style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '14px', color: '#555' }}
                >
                    Log in
                </Link>
            )}
        </header>
    );
}

export default NavBar;
