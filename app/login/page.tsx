'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, InputGroup, FormControl, FormCheck, Card } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import './login.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkSavedLogin = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/is-saved-login');
                const data = await response.json();
                if (data.isSaved) {
                    setRememberMe(true);
                    setUsername(data.email || '');
                }
            } catch (error) {
                console.error('Error checking saved login:', error);
            }
        };

        checkSavedLogin();

        const savedData = JSON.parse(localStorage.getItem('loginData'));
        if (savedData) {
            setUsername(savedData.email || '');
            setPassword(savedData.password || '');
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username,
                    password: password,
                    rememberMe: rememberMe
                })
            });

            const data = await response.json();

            if (response.ok) {
                const checkPasswordResponse = await fetch('http://localhost:8080/api/auth/check-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: username,
                        password: password
                    })
                });

                const checkPasswordData = await checkPasswordResponse.json();

                if (checkPasswordResponse.ok && checkPasswordData.match) {
                    if (rememberMe) {
                        localStorage.setItem('loginData', JSON.stringify({ email: username, password: password }));
                    } else {
                        localStorage.removeItem('loginData');
                    }
                    router.push('/main');
                } else {
                    alert('비밀번호가 일치하지 않습니다.');
                }
            } else {
                alert(data.message || '로그인 실패');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const handleSignupClick = () => {
        router.push('/signup');
    };

    return (
        <Container className="fullscreen-center">
            <Card className="login-card">
                <Card.Body>
                    <Form onSubmit={handleLogin} className="login-form" autoComplete='off'>
                        <Form.Label className="login-text">로그인</Form.Label>
                        <Row className="mb-3">
                            <Col sm={9}>
                                <Form.Group controlId="formBasicEmail" className="login-form-email mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword" className="login-form-pw mb-3">
                                    <InputGroup>
                                        <FormControl
                                            type={passwordShown ? "text" : "password"}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputGroup.Text onClick={togglePasswordVisibility}>
                                            {passwordShown ? <EyeSlashFill /> : <EyeFill />}
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Row className="mb-2">
                                    <Col xs={6}>
                                        <FormCheck
                                            type="checkbox"
                                            label="아이디 저장하기"
                                            checked={rememberMe}
                                            onChange={handleRememberMe}
                                        />
                                    </Col>
                                    <Col xs={6} className="text-right">
                                        <a href="#forgot-password" className="link-primary">ID/password 찾기</a>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <a onClick={handleSignupClick} className="signup-link">계정이 없으신가요? 회원가입하기</a>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={3}>
                                <Button type="submit" className="login-btn">
                                    Login
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginForm;
