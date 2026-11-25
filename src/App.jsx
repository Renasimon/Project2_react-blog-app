import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import BlogPostsPage from './pages/BlogPostsPage.jsx';
import IndividualPostPage from './pages/IndividualPostPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <div className="app-layout">
        <Header />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/posts" element={<BlogPostsPage />} />
            <Route path="/post/:id" element={<IndividualPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}