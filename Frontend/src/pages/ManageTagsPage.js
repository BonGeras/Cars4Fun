import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const TagsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CreateButton = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 1.5rem;

    &:hover {
        background-color: #2980b9;
    }
`;

const TagCard = styled.div`
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1.25rem;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
`;

const TagName = styled.h3`
    font-size: 1.1rem;
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
`;

const TagDescription = styled.p`
    color: #666;
    margin: 0 0 1rem 0;
    line-height: 1.4;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 0.75rem;
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

const FormContainer = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h3`
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-weight: 500;
    color: #2c3e50;
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #3498db;
    }
`;

const TextArea = styled.textarea`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    min-height: 100px;
    resize: vertical;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #3498db;
    }
`;

const SubmitButton = styled.button`
    padding: 0.75rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #2980b9;
    }
`;

const ErrorMessage = styled.p`
    color: #e74c3c;
    margin-top: 1rem;
`;

const SuccessMessage = styled.p`
    color: #27ae60;
    margin-top: 1rem;
`;

const LoadingSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    font-size: 1.2rem;
    color: #666;
`;

function ManageTagsPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingTag, setEditingTag] = useState(null);
    const [form, setForm] = useState({ name: '', description: '' });
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (!token || role !== 'admin') {
            navigate('/');
            return;
        }
        fetchTags();
    }, []);

    async function fetchTags() {
        setLoading(true);
        try {
            const res = await fetch('/api/tags');
            const data = await res.json();
            if (res.ok) {
                setTags(data);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    function handleNewTag() {
        setEditingTag(null);
        setForm({ name: '', description: '' });
    }

    function handleEditTag(tag) {
        setEditingTag(tag);
        setForm({ name: tag.name, description: tag.description || '' });
    }

    function handleFormChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleDeleteTag(tagId) {
        if (!window.confirm('Are you sure you want to delete this tag?')) return;
        try {
            const res = await fetch(`/api/tags/${tagId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                setTags(tags.filter(t => t.id !== tagId));
            } else {
                alert(data.error || 'Error deleting tag');
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setMsg('');

        if (!form.name.trim()) {
            setError('Name is required');
            return;
        }

        if (editingTag) {
            await updateTag();
        } else {
            await createTag();
        }
    }

    async function createTag() {
        try {
            const res = await fetch('/api/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setMsg('Tag created successfully');
                setTags([...tags, data]);
                setForm({ name: '', description: '' });
            } else {
                setError(data.error || 'Error creating tag');
            }
        } catch (err) {
            console.error(err);
            setError('Server error');
        }
    }

    async function updateTag() {
        try {
            const res = await fetch(`/api/tags/${editingTag.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setMsg('Tag updated successfully');
                const updated = tags.map(t =>
                    t.id === editingTag.id
                        ? { ...t, name: form.name, description: form.description }
                        : t
                );
                setTags(updated);
                setEditingTag(null);
                setForm({ name: '', description: '' });
            } else {
                setError(data.error || 'Error updating tag');
            }
        } catch (err) {
            console.error(err);
            setError('Server error');
        }
    }

    if (loading) {
        return (
            <PageContainer>
                <LoadingSpinner>Loading tags...</LoadingSpinner>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <PageTitle>Manage Tags</PageTitle>
            <ContentWrapper>
                <TagsList>
                    <CreateButton onClick={handleNewTag}>
                        Create new tag
                    </CreateButton>
                    {tags.map(tag => (
                        <TagCard key={tag.id}>
                            <TagName>{tag.name}</TagName>
                            {tag.description && (
                                <TagDescription>{tag.description}</TagDescription>
                            )}
                            <ButtonGroup>
                                <Button variant="edit" onClick={() => handleEditTag(tag)}>
                                    Edit
                                </Button>
                                <Button variant="delete" onClick={() => handleDeleteTag(tag.id)}>
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </TagCard>
                    ))}
                </TagsList>

                <FormContainer>
                    <FormTitle>{editingTag ? 'Edit Tag' : 'New Tag'}</FormTitle>
                    <StyledForm onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleFormChange}
                                placeholder="Enter tag name"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Description</Label>
                            <TextArea
                                name="description"
                                value={form.description}
                                onChange={handleFormChange}
                                placeholder="Enter tag description"
                            />
                        </FormGroup>

                        <SubmitButton type="submit">
                            {editingTag ? 'Update Tag' : 'Create Tag'}
                        </SubmitButton>
                    </StyledForm>

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {msg && <SuccessMessage>{msg}</SuccessMessage>}
                </FormContainer>
            </ContentWrapper>
        </PageContainer>
    );
}

export default ManageTagsPage;
