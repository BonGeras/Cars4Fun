import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import ReviewsPage from './pages/ReviewsPage';
import BrandsPage from './pages/BrandsPage';
import CarsPage from './pages/CarsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import MenuPage from './pages/MenuPage';
import ManagePostsPage from './pages/ManagePostsPage';
import NotFoundPage from './pages/NotFoundPage';
import UpdatePostPage from './pages/UpdatePostPage';
import SinglePostPage from './pages/SinglePostPage';
import ManageTagsPage from './pages/ManageTagsPage';

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/cars" element={<CarsPage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/menu" element={<MenuPage />} />
                <Route path="/create-post" element={<CreatePostPage />} />
                <Route path="/manage-posts" element={<ManagePostsPage />} />
                <Route path="/update-post/:id" element={<UpdatePostPage />} />
                <Route path="/posts/:id" element={<SinglePostPage />} />
                <Route path="/manage-tags" element={<ManageTagsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
