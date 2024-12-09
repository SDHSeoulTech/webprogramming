'use client';

import React, { useState } from 'react';
import Bars from '../bars';
import AuthButtons from './authbuttonns';
import ColumnCardGroup from './columncardgroup';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // 로그인 상태 변경 함수
  const handleLoginChange = (status: boolean, userId: string | null) => {
    setIsLoggedIn(status);
    setCurrentUserId(userId);
    console.log(userId);
  };

  return (
    <>
      <main>
        <Bars isLoggedIn={isLoggedIn} />
        <AuthButtons onLoginChange={handleLoginChange} />
        {isLoggedIn && (
  <>
    {console.log('Current User ID:', currentUserId)}
    <ColumnCardGroup currentUserId={currentUserId} />
  </>
)}
        <footer className="container">
          <p className="float-end">
            <a href="#">Back to top</a>
          </p>
          <p>
            © 2017–2024 Company, Inc. · <a href="#">Privacy</a> ·{' '}
            <a href="#">Terms</a>
          </p>
        </footer>
      </main>
    </>
  );
}