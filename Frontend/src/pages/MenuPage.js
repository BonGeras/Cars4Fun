import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MenuContainer = styled.div`
    max-width: 800px;
    margin: 40px auto;
    padding: 30px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    color: #333;
    font-size: 28px;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;
`;

const MenuList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 15px;
`;

const MenuItem = styled.li`
    margin-bottom: 10px;
`;

const MenuLink = styled(Link)`
    display: block;
    padding: 15px 20px;
    background: #f8f9fa;
    color: #333;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s ease;
    border: 1px solid #eee;

    &:hover {
        background: #e9ecef;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    &:active {
        transform: translateY(0);
    }
`;

const LogoutButton = styled.button`
    padding: 10px 20px;
    background: red;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid #eee;

    &:hover {
        background: darkred;
    }
`;

const LogoutRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

function MenuPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        navigate('/');
        navigate(0);
    };

    if (!token) {
        navigate('/login');
        navigate(0);
        return null;
    }

    return (
        <MenuContainer>
            <Title>{role === 'admin' ? 'Admin Menu' : 'User Menu'}</Title>
            <MenuList>
                {role === 'user' && (
                    <>
                        <MenuItem>
                            <MenuLink to="/create-post?category=reviews">Add Review</MenuLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuLink to="/manage-posts?category=reviews">Manage My Reviews</MenuLink>
                        </MenuItem>
                    </>
                )}

                {role === 'admin' && (
                    <>
                        <MenuItem>
                            <MenuLink to="/create-post?category=news">Add News Post</MenuLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuLink to="/manage-posts?category=news">Manage News</MenuLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuLink to="/create-post?category=brands">Add Brand</MenuLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuLink to="/manage-posts?category=brands">Manage Brands</MenuLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuLink to="/create-post?category=cars">Add Car</MenuLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuLink to="/manage-posts?category=cars">Manage Cars</MenuLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuLink to="/manage-posts?category=reviews&adminDelete=true">Manage Reviews</MenuLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuLink to="/manage-tags">Manage Tags</MenuLink>
                        </MenuItem>
                    </>
                )}
            </MenuList>

            <LogoutRow>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </LogoutRow>
        </MenuContainer>
    );
}

export default MenuPage;
