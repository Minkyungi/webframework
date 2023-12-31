// components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import '../styles/Header.css';

const Header = ({openFavoriteModal, showFavoritesButton = true}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  const handleOpenFavoriteModal = () => {
    openFavoriteModal();
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("User signed out");
    }).catch((error) => {
      console.error("Sign out error", error);
    });
  };

  return (
    <header className="header">
      <Link to="/">
        <img src="/data/logo.png" alt="Logo" className="logo" />
      </Link>
      <nav>
        {isAuthenticated ? (
          <>
            {showFavoritesButton && <button onClick={handleOpenFavoriteModal}>찜한 목록</button>}
            <button onClick={handleSignOut}>로그아웃</button>
          </>
        ) : (
          <>
          <Link to="/login">로그인</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;