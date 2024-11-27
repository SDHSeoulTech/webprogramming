'use client'
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [emailChecked, setEmailChecked] = useState(false);

  const checkEmail = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/check-email?email=${encodeURIComponent(email)}`);
      const isEmailTaken = await response.json();
      setIsEmailValid(!isEmailTaken);
      setEmailChecked(true);
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid) {
      console.log('Form submitted:', { email, password });
      // 여기에 회원가입 로직을 추가하세요.
    } else {
      console.log('Invalid email. Please check again.');
    }
  };

  return (
    <div className="container fullscreen-center">
      <div className="signup-card">
        <h2 className="signup-text">회원가입</h2>
        <Form onSubmit={handleSubmit} className="signup-form">
          <Form.Group controlId="formEmail">
            <Form.Label className="form-label">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control signup-form-email"
            />
            <Button variant="primary" className="mt-2 email-check-btn" onClick={checkEmail}>
              이메일 중복 확인
            </Button>
            {emailChecked && (
              <Alert variant={isEmailValid ? 'success' : 'danger'} className="mt-2 signup-alert">
                {isEmailValid ? '사용 가능한 이메일입니다.' : '이미 존재하는 이메일입니다.'}
              </Alert>
            )}
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control signup-form-password"
            />
          </Form.Group>

          <Button variant="success" type="submit" className="mt-3 signup-btn">
            회원가입
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
