import React,{useState} from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';

export default function ForgetPage() {
  
  const [email, setEmail] = useState('');
  console.log(email)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    await  axios.post( `http://localhost:8000/user/${email}/forgetPassword`);

      alert('An email has been sent with a reset code.');
    } catch (error) {
      alert('Something went wrong. Please try again later.');
    }
  };
  return (
    <div>
        <div style={{border:"1px solid black", margin: "80px 50px 75px 50px",width:"750px"}}>
        <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  </div>
        
    </div>
  )
}
