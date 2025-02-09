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
    font-size: 2rem;
    color: #333;
    margin-bottom: 2rem;
    font-weight: 600;
`;

const SearchContainer = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
`;

const SearchForm = styled.form`
    display: flex;
    gap: 1rem;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const SearchLabel = styled.label`
    font-weight: 500;
    color: #2c3e50;
    min-width: 100px;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
`;

const SearchButton = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    white-space: nowrap;

    &:hover {
        background-color: #2980b9;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const PostsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
`;

function ReviewsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [searchTag, setSearchTag] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
    });

    useEffect(() => {
        const page = parseInt(searchParams.get('page')) || 1;
        const tag = searchParams.get('tag') || '';
        setSearchTag(tag);
        fetchPosts(page, tag);
    }, [searchParams]);

    async function fetchPosts(page, tagValue = '') {
        try {
            let url = `/api/posts/reviews?page=${page}`;
            if (tagValue) {
                url += `&tag=${encodeURIComponent(tagValue)}`;
            }

            const res = await fetch(url);
            const data = await res.json();
            setPosts(data.posts || []);
            setPagination({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                totalItems: data.totalItems
            });
        } catch (err) {
            console.error(err);
            setPosts([]);
        }
    }

    function handleSearch(e) {
        e.preventDefault();
        setSearchParams({ page: '1', ...(searchTag && { tag: searchTag }) });
    }

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage.toString(), ...(searchTag && { tag: searchTag }) });
    };

    return (
        <PageContainer>
            <PageTitle>Reviews</PageTitle>
            <SearchContainer>
                <SearchForm onSubmit={handleSearch}>
                    <SearchLabel>Search by tag:</SearchLabel>
                    <SearchInput
                        type="text"
                        value={searchTag}
                        onChange={e => setSearchTag(e.target.value)}
                        placeholder="Enter tag name..."
                    />
                    <SearchButton type="submit">
                        Search
                    </SearchButton>
                </SearchForm>
            </SearchContainer>

            <PostsGrid>
                {posts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </PostsGrid>
            
            <Pagination 
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
            />
        </PageContainer>
    );
}

export default ReviewsPage;
