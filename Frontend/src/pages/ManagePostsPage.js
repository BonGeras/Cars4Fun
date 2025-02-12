import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PostCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const PostTitle = styled.h3`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const PostContent = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  ${({ variant }) => variant === 'edit' && `
    background-color: #3498db;
    color: white;

    &:hover {
      background-color: #2980b9;
    }
  `}

  ${({ variant }) => variant === 'delete' && `
    background-color: #e74c3c;
    color: white;

    &:hover {
      background-color: #c0392b;
    }
  `}
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 1.2rem;
  color: #666;
`;

const EmptyState = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-top: 2rem;
`;

function ManagePostsPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const categoryParam = params.get('category');

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const userId = localStorage.getItem('userId');
            const role = localStorage.getItem('role');
            
            const category = categoryParam || 'reviews';
            let url = `/api/posts/${category}?role=${role}`;
            
            if (role === 'user') {
                url += `&userId=${userId}`;
            }

            console.log('Fetching from URL:', url);
            const res = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!res.ok) throw new Error('Failed to fetch posts');

            const data = await res.json();
            console.log('Fetched posts:', data);
            setPosts(data.posts || []);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    const canManagePost = (post) => {
        if (role === 'admin') return true;
        if (role === 'user' && post.category === 'reviews') {
            return String(post.userId) === userId;
        }
        return false;
    };

    const handleDelete = async (id) => {
        const post = posts.find(p => p.id === id);
        if (!post || !canManagePost(post)) {
            alert('You do not have permission to delete this post');
            return;
        }

        if (!window.confirm('Are you sure you want to delete this post?')) return;
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                alert('Post deleted');
                setPosts(posts.filter(p => p.id !== id));
            } else {
                const data = await res.json();
                alert('Error: ' + data.error);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (id) => {
        const post = posts.find(p => p.id === id);
        if (!post || !canManagePost(post)) {
            alert('You do not have permission to edit this post');
            return;
        }
        navigate(`/update-post/${id}`);
    };

    if (loading) {
        return (
            <PageContainer>
                <LoadingSpinner>Loading...</LoadingSpinner>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <PageTitle>Manage your posts</PageTitle>
            {!posts.length ? (
                <EmptyState>No posts found.</EmptyState>
            ) : (
                <PostsGrid>
                    {posts.map(post => (
                        <PostCard key={post.id}>
                            <PostTitle>{post.title}</PostTitle>
                            <PostContent>{post.content}</PostContent>
                            {canManagePost(post) && (
                                <ButtonGroup>
                                    <Button variant="edit" onClick={() => handleEdit(post.id)}>
                                        Edit
                                    </Button>
                                    <Button variant="delete" onClick={() => handleDelete(post.id)}>
                                        Delete
                                    </Button>
                                </ButtonGroup>
                            )}
                        </PostCard>
                    ))}
                </PostsGrid>
            )}
        </PageContainer>
    );
}

export default ManagePostsPage;
