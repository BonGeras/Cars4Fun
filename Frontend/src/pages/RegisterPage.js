import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const AuthContainer = styled.div`
    max-width: 400px;
    margin: 60px auto;
    padding: 40px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    color: #333;
    font-size: 28px;
    margin-bottom: 30px;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    color: #555;
    font-size: 14px;
    font-weight: 500;
`;

const Input = styled.input`
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 15px;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
    }
`;

const Button = styled.button`
    padding: 12px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;

    &:hover {
        background: #0056b3;
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const Message = styled.p`
    text-align: center;
    margin: 0;
    font-size: 14px;
    
    &.error {
        color: #dc3545;
    }
    
    &.success {
        color: #28a745;
    }
`;

const SigninPrompt = styled.div`
    text-align: center;
    margin-top: 20px;
    color: #666;
    font-size: 14px;

    a {
        color: #007bff;
        text-decoration: none;
        font-weight: 500;
        margin-left: 5px;

        &:hover {
            text-decoration: underline;
        }
    }
`;

function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMsg('');
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setMsg('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 1500);
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            setError('Server error');
        }
    };

    return (
        <AuthContainer>
            <Form onSubmit={handleSubmit}>
                <Title>Create Account</Title>
                
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        placeholder="Choose a username"
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        placeholder="Choose a password"
                    />
                </FormGroup>

                <Button type="submit">Sign Up</Button>

                {error && <Message className="error">{error}</Message>}
                {msg && <Message className="success">{msg}</Message>}
            </Form>

            <SigninPrompt>
                Already have an account?<Link to="/login">Sign In</Link>
            </SigninPrompt>
        </AuthContainer>
    );
}

export default RegisterPage;
