import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BrandPostView from '../components/BrandPostView';
import CarPostView from '../components/CarPostView';
import NewsPostView from '../components/NewsPostView';
import ReviewPostView from '../components/ReviewPostView';

function SinglePostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchPostData();
    }, []);

    async function fetchPostData() {
        try {
            const res = await fetch(`/api/posts/id/${id}`, {
            });
            if (!res.ok) {
                setError('Could not fetch post data');
                return;
            }
            const data = await res.json();
            setPost(data);
        } catch (err) {
            console.error(err);
            setError('Server error');
        }
    }

    if (error) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>{error}</h2>
            </div>
        );
    }

    if (!post) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>Loading post...</h2>
            </div>
        );
    }

    if (post.category === 'brands') {
        return <BrandPostView post={post} />;
    } else if (post.category === 'cars') {
        return <CarPostView post={post} />;
    } else if (post.category === 'news') {
        return <NewsPostView post={post} />;
    } else if (post.category === 'reviews') {
        return <ReviewPostView post={post} />;
    } else {
        return (
            <div style={{ padding: '20px' }}>
                <h2>Unknown post category: {post.category}</h2>
                <p>{post.title}</p>
            </div>
        );
    }
}

export default SinglePostPage;
