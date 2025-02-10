import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
`;

const PageButton = styled.button`
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background-color: ${props => props.active ? '#3498db' : 'white'};
    color: ${props => props.active ? 'white' : '#333'};
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.active ? '#2980b9' : '#f8f9fa'};
    }

    &:disabled {
        background-color: #f8f9fa;
        color: #adb5bd;
        cursor: not-allowed;
    }
`;

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <PaginationContainer>
            <PageButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </PageButton>

            {pages.map(page => (
                <PageButton
                    key={page}
                    active={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </PageButton>
            ))}

            <PageButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </PageButton>
        </PaginationContainer>
    );
}

export default Pagination; 