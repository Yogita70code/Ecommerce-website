import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [message, setMessage] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  console.log("checkbox", checkbox);

  const handleCheckbox = (event) => {
    console.log("event", event);
    setCheckbox(!checkbox);
    console.log("event=", !checkbox);
  }
  console.log("name", name);
  console.log("email", email);
  console.log("address", address);
  console.log("password", password);
  console.log("confirm password", confirm_password);

  const handleRegister = () => {
    if (password == confirm_password) {
      const formData = new FormData();
      formData.append("name", name)
      formData.append('email', email)
      formData.append('address', address)
      formData.append('password', password)
      formData.append('confirm_password', confirm_password)
      formData.append('checkbox', checkbox);
      formData.append('role', role);
      console.log("function called", role);
      axios.post("http://localhost:8000/register", formData).then(function (res) {
        console.log("backend response", res);
        setMessage(res?.data?.message)
        if (res?.data.status == 1) {
          setTimeout(() => {
            console.log("navigate another router");
            navigate("/login")
          }, 2000)
        } else {
          setMessage(res?.data?.message);
        }
      }).catch(function (error) {
        console.log("backend error", error);
        setMessage("Sometime went wrong");
      })
    } else {
      setMessage("password && confirm_password should be match");
    }
  }
  return (
    <div>
      <br />
      <center><h2>Registration / SignUp</h2>
        <br />
        <div><label htmlFor="name">Name</label>
          <input type="text" value={name} name='name' onChange={(event) => { setName(event.target.value) }}></input>
        </div>
        <br />
        <div><label htmlFor="email">Email</label>
          <input type="email" value={email} name='email' onChange={(event) => { setEmail(event.target.value) }}></input>
        </div>
        <br />
        <div><label htmlFor="address">Address</label>
          <input type="address" value={address} name='address' onChange={(event) => { setAddress(event.target.value) }}></input>
        </div>
        <br />
        <div><label htmlFor="password">Password</label>
          <input type="password" value={password} name='password' onChange={(event) => { setPassword(event.target.value) }}></input>
        </div>
        <br />
        <div><label htmlFor="confirm_password">Confirm_password</label>
          <input type="password" value={confirm_password} name='confirm_password' onChange={(event) => { setConfirm_password(event.target.value) }}></input>
        </div><br />
        <div>
          <label style={{ marginLeft: "-40px" }}>Role -:</label>
          <input style={{ marginLeft: "10px" }} type="radio" name="role" value="merchant" onChange={(e) => { setRole(e.target.value) }}></input>
          <label htmlFor="role" style={{ marginLeft: "10px" }}>Merchant</label>
          <input style={{ marginLeft: "10px" }} type="radio" name="role" value="customer" onChange={(e) => {
            setRole(e.target.value)
          }}></input>
          <label htmlFor="role" style={{ marginLeft: "10px" }}>Customer</label>
        </div> <br />
        <div>
          <label htmlFor="checkbox">
            <input className='Checkbox' type="checkbox" onChange={(event) => { handleCheckbox(event) }} name='checkbox' id='checkbox' value={checkbox} />All terms and conditions accepted.
          </label>
        </div><br />

        <br />
        {email.length > 0 && password.length > 0 && confirm_password.length > 0 && name.length > 0 && address.length > 0 && checkbox == true >0 && role? <button onClick={handleRegister} style={{ cursor: "pointer", backgroundColor: "#87CEFA", color: "black", borderRadius: "5px", padding: "4px 4px", fontSize: "15px", border: "none" }}>Submit</button> : <button style={{ cursor: "not-allowed", backgroundColor: "#87CEFA", color: "black", borderRadius: "5px", padding: "4px 4px" }} disabled>Submit</button>
        }
        <br />
        <div>
          <span style={{ padding: "1px", fontSize: "16px" }}>User already register?<a href="/login">
            <span style={{ cursor: "pointer" }}>Login</span></a></span>
        </div>
        <span style={{ color: "lightseagreen" }}>{message}</span>
      </center>
      <br />

    </div>

  )
}
