import React, { useState } from 'react';

export default function CommentSection() {
  const [comments, setComments] = useState(['Comment 1', 'Comment 2', 'Comment 3']);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setComments([...comments, input]);
    setInput('');
  };

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows="3"
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <h4>Existing Comments:</h4>
      <ul className="comment-list">
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
}