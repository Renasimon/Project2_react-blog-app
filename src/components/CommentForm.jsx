import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function CommentForm({ onAddComment }) {
  const { user } = useAuth();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !user?.username) return;

    onAddComment({
      name: user.username,
      email: `${user.username.toLowerCase()}@example.com`,
      text: text.trim(),
    });
    setText('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h4>Leave a Comment as {user?.username}</h4>
      <textarea
        placeholder="Write your Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3"
        required
      />
      <button type="submit" className="submit-btn">Submit Comment</button>
    </form>
  );
}