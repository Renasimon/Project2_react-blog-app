import React, { useState } from 'react';

export default function BlogPost({ title, content, author, date }) {
  const [likes, setLikes] = useState(0);

  return (
    <div className="post-header">
      <div className="title-row">
        <h2>{title}</h2>
        {/* Extra Credit Interactive Like Button (from module 9) */}
        <button className="like-btn" onClick={() => setLikes(likes + 1)}>
          ❤️ {likes}
        </button>
      </div>
      <p className="post-content">{content}</p>
      <p className="post-meta"><strong>Author:</strong> {author}</p>
      <p className="post-meta"><strong>Date:</strong> {date}</p>
    </div>
  );
}