import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Message from "./Components/Header/Message";
export default function Loginu() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const[getMessage,setGetMessage]=useState(false);
  const[status,setStatus]=useState(0);
  const navigate = useNavigate();
  console.log("email", email);
  console.log("password", password);

  const handleLogin = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    console.log("function called");
    axios
      .post("http://localhost:8000/login", formData)
      .then(function (res) {
        console.log("backend response", res);
        if (res?.data.status === 1) {
          // localStorage.setItem("email","yogita123@gmail.com")//to gave static login mail
          localStorage.setItem("email",res?.data?.email)//to gave dynamic mail in server
          localStorage.setItem("token",res?.data?.token)
          console.log("res?.data",res?.data)
          setMessage(res?.data?.message);
        setGetMessage(true);
        setStatus(1);
          setTimeout(() => {
          console.log("navigate another route");
          navigate("/")
          }, 1000);
        }
        else{
          setMessage(res?.data?.message);
          setGetMessage(true);
          setStatus(0);
          setTimeout(()=>{
            setGetMessage(false);
          },1000);
        }
      })
      .catch(function (error) {
        console.log("backend error", error);
      });
  };
  return (
    <div>
      <br />
      <div style={{border:"2px solid black",}}>
        <center>
          <h2>LogIn / SignIn</h2>
          <br />
          {getMessage?<Message message={message} status={status}/>:""}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>
          </div>
          <br />
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
          </div>
          <br />
          {email? (
            <button
              onClick={handleLogin}
              style={{
                cursor: "pointer",
                backgroundColor:"#87CEFA",
                color: "black",
                textDecoration:"none",
                border:"none",
                borderRadius:"5px",
                padding:"5px 5px"
              }}
            >
              LogIn
            </button>
          ) : (
            <button
              style={{
                cursor: "not-allowed",
                backgroundColor:"#87CEFA",
                color: "black",
                borderRadius:"5px",
                padding:"5px 5px"
              }}
              disabled
            >
              LogIn
            </button>
          )}
          <br />
          <span style={{ color: "lightseagreen" }}>{message}</span>
          <br />
          <span style={{ fontSize: "15px" }}>Did not remember password.</span>
          <span
            style={{
              fontSize: "15px"
            }}
          >
            <Link to="/forgetpage" style={{ fontSize: "13px" ,color:"blue" }}>Forget password</Link>
            
            <Link to="/registration"style={{ fontSize: "13px" ,color:"blue" }}><br />SignUp</Link>
          </span>
          <br />
        </center>
      </div>
    </div>
  );
}
