'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

export default function AuthButtons({ onLoginChange }: { onLoginChange: (loggedIn: boolean, userId: string | null) => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'register'>('login');

  const handleRegister = async (username: string, password: string) => {
    try {
      await axios.post('http://localhost:8080/register', { username, password });
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/login', { username, password });
      localStorage.setItem('token', response.data.token);
      console.log(response.data);
      const userId = response.data.userId; // 서버에서 사용자 ID를 받아온다고 가정
      setIsLoggedIn(true);
      onLoginChange(true, userId);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    onLoginChange(false, null);
    alert('Logged out successfully!');
  };

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (modalType === 'register') {
      handleRegister(username, password);
    } else {
      handleLogin(username, password);
    }
    setShowModal(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <>
          <Button variant="primary" onClick={() => { setModalType('login'); setShowModal(true); }}>
            Login
          </Button>
          <Button variant="secondary" onClick={() => { setModalType('register'); setShowModal(true); }} className="ms-2">
            Register
          </Button>
        </>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'login' ? 'Login' : 'Register'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleModalSubmit}>
          <Modal.Body>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" required />
            </Form.Group>
            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {modalType === 'login' ? 'Login' : 'Register'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}