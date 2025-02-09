import React, { useEffect, useState } from 'react';
import PostItem from '../components/PostItem';
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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
`;

const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
    text-align: center;
`;

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const res = await fetch('/api/posts/recent');
            if (!res.ok) throw new Error(`Error: ${res.status}`);

            const data = await res.json();
            setPosts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Failed to load posts');
            setPosts([]);
        }
    }

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
        </PageContainer>
    );
}

export default HomePage;
