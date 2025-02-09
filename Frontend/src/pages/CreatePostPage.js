import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
`;

const PageTitle = styled.h2`
    font-size: 2rem;
    color: #333;
    margin-bottom: 2rem;
    font-weight: 600;
    text-transform: capitalize;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    min-height: 120px;
    resize: vertical;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #3498db;
    }
`;

const Select = styled.select`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    background-color: white;
    cursor: pointer;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #3498db;
    }
`;

const ImageUploadContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`;

const ImageUploadGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const FileInput = styled.input`
    padding: 0.5rem;
    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;

    &::-webkit-file-upload-button {
        padding: 0.5rem 1rem;
        background: #f8f9fa;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 1rem;
        transition: background-color 0.2s;

        &:hover {
            background: #e9ecef;
        }
    }
`;

const SubmitButton = styled.button`
    padding: 1rem;
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

function CreatePostPage() {
    const role = localStorage.getItem('role') || '';
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const defaultCategory = searchParams.get('category') || 'reviews';

    const [form, setForm] = useState({
        title: '',
        content: '',
        category: defaultCategory
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

    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);

    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    function readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const splitted = reader.result.split(',');
                if (splitted.length === 2) {
                    resolve(splitted[1]);
                } else {
                    resolve('');
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
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

    const handleFileChange1 = (e) => setFile1(e.target.files[0]);
    const handleFileChange2 = (e) => setFile2(e.target.files[0]);
    const handleFileChange3 = (e) => setFile3(e.target.files[0]);
    const handleFileChange4 = (e) => setFile4(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMsg('');

        try {
            const files = [file1, file2, file3, file4];
            const base64Array = await Promise.all(
                files.map(file => file ? readFileAsBase64(file) : '')
            );

            const [imageBase64_1, imageBase64_2, imageBase64_3, imageBase64_4] = base64Array;

            const payload = {
                ...form,
                imageBase64_1,
                imageBase64_2,
                imageBase64_3,
                imageBase64_4
            };

            if (form.category === 'brands') {
                payload.brand_intro = categoryFields.brand_intro;
                payload.brand_history = categoryFields.brand_history;
                payload.brand_philosophy = categoryFields.brand_philosophy;
            } else if (form.category === 'reviews') {
                payload.review_intro = categoryFields.review_intro;
                payload.review_driving = categoryFields.review_driving;
                payload.review_design = categoryFields.review_design;
            } else if (form.category === 'cars') {
                payload.car_years = categoryFields.car_years;
                payload.car_bodytype = categoryFields.car_bodytype;
                payload.car_engines = categoryFields.car_engines;
            } else if (form.category === 'news') {
                payload.news_text = categoryFields.news_text;
            }

            const token = localStorage.getItem('token');
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok) {
                setMsg('Post created successfully');
                navigate(`/${form.category}`);
            } else {
                setError(data.error || 'Error creating post');
            }
        } catch (err) {
            console.error(err);
            setError('Server error');
        }
    };

    return (
        <PageContainer>
            <PageTitle>Create {form.category} post</PageTitle>
            <StyledForm onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Content</Label>
                    <TextArea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Category</Label>
                    <Select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    >
                        {role === 'user' && (
                            <option value="reviews">reviews</option>
                        )}
                        {role === 'admin' && (
                            <>
                                <option value="reviews">reviews</option>
                                <option value="news">news</option>
                                <option value="brands">brands</option>
                                <option value="cars">cars</option>
                            </>
                        )}
                    </Select>
                </FormGroup>

                {renderCategoryFields()}

                <FormGroup>
                    <Label>Images</Label>
                    <ImageUploadContainer>
                        <ImageUploadGroup>
                            <FileInput type="file" accept="image/*" onChange={handleFileChange1} />
                            <FileInput type="file" accept="image/*" onChange={handleFileChange2} />
                        </ImageUploadGroup>
                        <ImageUploadGroup>
                            <FileInput type="file" accept="image/*" onChange={handleFileChange3} />
                            <FileInput type="file" accept="image/*" onChange={handleFileChange4} />
                        </ImageUploadGroup>
                    </ImageUploadContainer>
                </FormGroup>

                <SubmitButton type="submit">Create Post</SubmitButton>
            </StyledForm>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {msg && <SuccessMessage>{msg}</SuccessMessage>}
        </PageContainer>
    );
}

export default CreatePostPage;
