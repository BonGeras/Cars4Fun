import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostItem from '../components/PostItem';
import Pagination from '../components/Pagination';
import styled from 'styled-components';

const PageContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
`;

const PageTitle = styled.h1`
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 2rem;
    font-weight: 600;
    text-align: center;
`;

const PostsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
    text-align: center;
`;

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
    });

    useEffect(() => {
        const page = parseInt(searchParams.get('page')) || 1;
        fetchPosts(page);
    }, [searchParams]);

    async function fetchPosts(page) {
        try {
            const res = await fetch(`/api/posts/recent?page=${page}&limit=9`);
            if (!res.ok) throw new Error(`Error: ${res.status}`);

            const data = await res.json();
            setPosts(data.posts || []);
            setPagination({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                totalItems: data.totalItems
            });
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Failed to load posts');
            setPosts([]);
        }
    }

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage.toString() });
    };

    return (
        <PageContainer>
            <PageTitle>Welcome to CARS4FUN!</PageTitle>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <PostsGrid>
                {posts.length > 0 ? (
                    posts.map((post) => <PostItem key={post.id} post={post} />)
                ) : (
                    <p style={{ textAlign: 'center', color: '#555' }}>No posts available.</p>
                )}
            </PostsGrid>
            <Pagination 
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
            />
        </PageContainer>
    );
}

export default HomePage;
