import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import CommentForm from '../components/CommentForm.jsx';

export default function IndividualPostPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
      })
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData);
        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      })
      .then((response) => response.json())
      .then((commentsData) => {
        setComments(commentsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts :(', err);
      });
  }, [id]);

  const handleAddComment = (newComment) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        name: newComment.name,
        email: newComment.email,
        body: newComment.text,
        postId: Number(id),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, { ...data, id: comments.length+1}]);
      })
      .catch((err) => console.error('Error posting comment', err));
  };

  if (loading) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p>Loading post...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <Link to="/posts" className="back-link">Back to Posts</Link>
      <h2 style={{ marginTop: '1rem' }}>{post.title}</h2>
      <p className="post-meta">
        <strong>Author:</strong> {user ? user.name : 'Loading...'}
        {user && ` (${user.email})`}
      </p>

      <p className="post-content" style={{ whiteSpace: 'pre-line' }}>{post.body}</p>

      <hr style={{ margin: '2rem 0' }} />

      <div className="comments-container">
        <h3>Comments ({comments.length})</h3>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} style={{ marginBottom: '0.75rem' }}>
                <strong>{comment.name}:</strong> {comment.body || comment.text}
              </li>
            ))}
          </ul>
        )}

        {isAuthenticated ? (
          <CommentForm onAddComment={handleAddComment} />
        ) : (
          <div className="login-prompt" style={{ marginTop: '1.5rem' }}>
            <p>
              You must <Link to="/login">log in</Link> to post a comment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}