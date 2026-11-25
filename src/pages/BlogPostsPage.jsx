import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then(data => {setPosts(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching posts:", err));
  }, []);

  if (loading) {
    return(
      <div className="card" style={{ textAlign:'center', padding:'3rem'}}>
        <p>Loading posts...</p>
      </div>
    );
  }
  return (
    <div className="card">
      <h2>All Posts</h2>
      <hr style={{margin:'1rem 0'}}/>
      {posts.map((post)=>(
        <div key={post.id} className="post-preview" style={{marginBottom:'2 rem'}}>
          <h3>
            <Link to={ `/post/${post.id}` }>{post.title}</Link>
          </h3>
          <p className="post-content">{post.body.substring(0,100)}</p>
        </div>
      ))}
    </div>
  )
      


}