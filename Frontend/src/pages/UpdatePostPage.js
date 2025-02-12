import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
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
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
`;

const TextArea = styled.textarea`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    min-height: 120px;
    resize: vertical;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
`;

const SubmitButton = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #2980b9;
    }
`;

const ErrorMessage = styled.p`
    color: #e74c3c;
    margin-bottom: 1rem;
    font-weight: 500;
`;

const SuccessMessage = styled.p`
    color: #27ae60;
    margin-bottom: 1rem;
    font-weight: 500;
`;

const LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.2rem;
    color: #666;
    padding: 2rem;
`;

const TagManagementSection = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TagsTitle = styled.h3`
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1.5rem;
    font-weight: 600;
`;

const TagsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
`;

const TagCard = styled.div`
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    padding: 1rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const TagName = styled.strong`
    color: #2c3e50;
`;

const TagDescription = styled.p`
    color: #666;
    font-size: 0.9rem;
    margin: 0;
`;

const TagButton = styled.button`
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    ${({ isAssigned }) => isAssigned ? `
        background-color: #e74c3c;
        color: white;

        &:hover {
            background-color: #c0392b;
        }
    ` : `
        background-color: #3498db;
        color: white;

        &:hover {
            background-color: #2980b9;
        }
    `}
`;

function UpdatePostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    const [post, setPost] = useState(null);
    const [form, setForm] = useState({
        title: '',
        content: '',
        category: 'reviews'
    });
    const [categoryFields, setCategoryFields] = useState({
        brand_intro: '',
        brand_history: '',
        brand_philosophy: '',
        review_intro: '',
        review_driving: '',
        review_design: '',
        car_years: '',
        car_bodytype: '',
        car_engines: '',
        news_text: ''
    });

    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    const [allTags, setAllTags] = useState([]);
    const [tagsError, setTagsError] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchPost();
        fetchAllTags();
    }, []);

    async function fetchPost() {
        try {
            const res = await fetch(`/api/posts/id/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) {
                setError('Could not fetch post data');
                return;
            }
            const data = await res.json();

            setPost(data);
            setForm(prevForm => ({
                ...prevForm,
                title: data.title || '',
                content: data.content || '',
                category: data.category
            }));
            setCategoryFields(prevFields => ({
                ...prevFields,
                brand_intro: data.brand_intro || '',
                brand_history: data.brand_history || '',
                brand_philosophy: data.brand_philosophy || '',
                review_intro: data.review_intro || '',
                review_driving: data.review_driving || '',
                review_design: data.review_design || '',
                car_years: data.car_years || '',
                car_bodytype: data.car_bodytype || '',
                car_engines: data.car_engines || '',
                news_text: data.news_text || ''
            }));
<<<<<<< HEAD
            await fetchPost();
=======
>>>>>>> 9de206efb49b8183a0366f9a0d0fc01e86640251
        } catch (err) {
            console.error('Error fetching post:', err);
            setError('Server error');
        }
    }

    async function fetchAllTags() {
        try {
            const res = await fetch('/api/tags');
            if (!res.ok) {
                setTagsError('Could not fetch tags');
                return;
            }
            const data = await res.json();
            setAllTags(data);
        } catch (err) {
            console.error(err);
            setTagsError('Server error fetching tags');
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCategoryFieldChange = (e) => {
        setCategoryFields({
            ...categoryFields,
            [e.target.name]: e.target.value
        });
    };

    function renderCategoryFields() {
        if (form.category === 'brands') {
            return (
                <>
                    <FormGroup>
                        <Label>Brand Introduction</Label>
                        <TextArea
                            name="brand_intro"
                            value={categoryFields.brand_intro}
                            onChange={handleCategoryFieldChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Brand History</Label>
                        <TextArea
                            name="brand_history"
                            value={categoryFields.brand_history}
                            onChange={handleCategoryFieldChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Brand Philosophy</Label>
                        <TextArea
                            name="brand_philosophy"
                            value={categoryFields.brand_philosophy}
                            onChange={handleCategoryFieldChange}
                        />
                    </FormGroup>
                </>
            );
        } else if (form.category === 'reviews') {
            return (
                <>
                    <FormGroup>
                        <Label>Review Introduction</Label>
                        <TextArea
                            name="review_intro"
                            value={categoryFields.review_intro}
                            onChange={handleCategoryFieldChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Driving Experience</Label>
                        <TextArea
                            name="review_driving"
                            value={categoryFields.review_driving}
                            onChange={handleCategoryFieldChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Design and Comfort</Label>
                        <TextArea
                            name="review_design"
                            value={categoryFields.review_design}
                            onChange={handleCategoryFieldChange}
                        />
                    </FormGroup>
                </>
            );
        } else if (form.category === 'cars') {
            return (
                <>
                    <FormGroup>
                        <Label>Years of production</Label>
                        <Input
                            type="text"
                            name="car_years"
                            value={categoryFields.car_years}
                            onChange={handleCategoryFieldChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Body type</Label>
                        <Input
                            type="text"
                            name="car_bodytype"
                            value={categoryFields.car_bodytype}
                            onChange={handleCategoryFieldChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Engine types</Label>
                        <Input
                            type="text"
                            name="car_engines"
                            value={categoryFields.car_engines}
                            onChange={handleCategoryFieldChange}
                        />
                    </FormGroup>
                </>
            );
        } else if (form.category === 'news') {
            return (
                <FormGroup>
                    <Label>News Text</Label>
                    <TextArea
                        name="news_text"
                        value={categoryFields.news_text}
                        onChange={handleCategoryFieldChange}
                    />
                </FormGroup>
            );
        }
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMsg('');

        try {
            const payload = {
                ...form,
                ...(form.category === 'brands' && {
                    brand_intro: categoryFields.brand_intro,
                    brand_history: categoryFields.brand_history,
                    brand_philosophy: categoryFields.brand_philosophy
                }),
                ...(form.category === 'reviews' && {
                    review_intro: categoryFields.review_intro,
                    review_driving: categoryFields.review_driving,
                    review_design: categoryFields.review_design
                }),
                ...(form.category === 'cars' && {
                    car_years: categoryFields.car_years,
                    car_bodytype: categoryFields.car_bodytype,
                    car_engines: categoryFields.car_engines
                }),
                ...(form.category === 'news' && {
                    news_text: categoryFields.news_text
                })
            };

            const res = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Error updating post');
            }

            setMsg('Post updated successfully');
            await fetchPost(); // Refresh the data
        } catch (err) {
            console.error('Error in handleSubmit:', err);
            setError(err.message || 'Server error');
        }
    };

    function canManageTags() {
        if (!post) return false;
        if (role === 'guest') return false;

        if (post.category === 'reviews') {
            if (role === 'admin') return true;
            return String(post.userId) === String(userId);
        } else {
            return role === 'admin';
        }
    }

    async function handleAssign(tagId) {
        try {
            setTagsError('');
            const res = await fetch(`/api/tags/${tagId}/assign/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) {
                setTagsError(data.error || 'Error assigning tag');
            } else {
                fetchPost();
            }
        } catch (err) {
            console.error(err);
            setTagsError('Server error');
        }
    }

    async function handleUnassign(tagId) {
        try {
            setTagsError('');
            const res = await fetch(`/api/tags/${tagId}/unassign/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) {
                setTagsError(data.error || 'Error unassigning tag');
            } else {
                fetchPost();
            }
        } catch (err) {
            console.error(err);
            setTagsError('Server error');
        }
    }

    function renderTagManagementSection() {
        if (!post || !canManageTags()) {
            return null;
        }

        const assignedTagIds = post.tags ? post.tags.map(t => t.id) : [];

        return (
            <TagManagementSection>
                <TagsTitle>Tag Management</TagsTitle>
                {tagsError && <ErrorMessage>{tagsError}</ErrorMessage>}
                {!allTags.length && <p>No tags yet.</p>}

                <TagsGrid>
                    {allTags.map(tag => {
                        const isAssigned = assignedTagIds.includes(tag.id);
                        return (
                            <TagCard key={tag.id}>
                                <TagName>{tag.name}</TagName>
                                {tag.description && (
                                    <TagDescription>{tag.description}</TagDescription>
                                )}
                                <TagButton
                                    isAssigned={isAssigned}
                                    onClick={() => isAssigned ? handleUnassign(tag.id) : handleAssign(tag.id)}
                                >
                                    {isAssigned ? 'Unassign' : 'Assign'}
                                </TagButton>
                            </TagCard>
                        );
                    })}
                </TagsGrid>
            </TagManagementSection>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <ErrorMessage>{error}</ErrorMessage>
            </PageContainer>
        );
    }

    if (!post) {
        return (
            <PageContainer>
                <LoadingMessage>Loading post...</LoadingMessage>
            </PageContainer>
        );
    }
    return (
        <PageContainer>
            <PageTitle>Update Post (ID: {id})</PageTitle>
            {msg && <SuccessMessage>{msg}</SuccessMessage>}

            <StyledForm onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Description</Label>
                    <TextArea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                    />
                </FormGroup>

                {renderCategoryFields()}

                <SubmitButton type="submit">Save Changes</SubmitButton>
            </StyledForm>

            {renderTagManagementSection()}
        </PageContainer>
    );
}

export default UpdatePostPage;
