import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <main className="landing-container">
      <section className="hero-section">
        <span className="hero-badge">Computer Science Blog by Rena Simon</span>
        <h1>
          {isAuthenticated
            ? `Welcome back, ${user.username}!`
            : 'Code, Classes, and Campus'}
        </h1>
        <p className="hero-subtitle">
          A student space for sharing programming advice, challenges,
          notes, and thoughts on university in general.
          Explore posts, switch themes anytime, and join the conversation.
        </p>

        <div className="hero-actions">
          {isAuthenticated ? (
            <Link to="/posts" className="btn-primary">
              Explore the Blog
            </Link>
          ) : (
            <Link to="/login" className="btn-primary">
              Log In to Leave a Comment!
            </Link>
          )}
        </div>
      </section>

      <section className="features-grid">
        <article className="feature-card">
          <h3>CS Coursework &amp; Projects</h3>
          <p>Read through my posts about web development, software engineering, and professional opportunities.</p>
        </article>
        <article className="feature-card">
          <h3>Group Discussions</h3>
          <p>Log in to leave comments and share advice.</p>
        </article>
        <article className="feature-card">
          <h3>Late Night Study Forum</h3>
          <p>Switch between light and dark themes for comfortable scrolling during late coding sessions.</p>
        </article>
      </section>
    </main>
  );
}