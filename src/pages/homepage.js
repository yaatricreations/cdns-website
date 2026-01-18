// src/Home.js
import React from "react";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to My Website</h1>
      <p>This is the landing page of your React app.</p>
      <a href="/about">Go to About Page</a>
    </div>
  );
}

export default Home;
