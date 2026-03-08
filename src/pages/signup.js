// src/components/Signup.js
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { data: user, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signupError) throw signupError;

      // Insert into users table
      const { error: dbError } = await supabase
        .from("users")
        .insert([{ id: user.user.id, email, name, role: "user" }]);
      if (dbError) throw dbError;

      alert("Account created successfully!");
      navigate("/login"); // redirect to login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
