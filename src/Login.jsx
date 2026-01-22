import React, { useState } from 'react';
import "./Login.css";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { email, password };

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
            throw new Error('Something went wrong');
            }

            const result = await response.json();
            setMessage(result.message);
            sessionStorage.setItem("session_token", result.access_token)
            console.log(result);
        } catch (error) {
            setMessage('Error posting data');
            console.error('Error:', error);
        }
    };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='App'>
        <label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Email'
          />
        </label>
        <br />
        <label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Password'
          />
        </label>
        <br />
        {message && <p>{message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
