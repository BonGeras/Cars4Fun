import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async (page) => {
        try {
            const response = await fetch(`/api/posts/recent?page=${page}`);
            const data = await response.json();
            
            setPosts(data.posts);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        // При изменении страницы прокручиваем наверх
        window.scrollTo(0, 0);
    };

    return (
        <div className="posts-page">
            {/* Список постов */}
            <div className="posts-grid">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* Компонент пагинации */}
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default PostsPage; 