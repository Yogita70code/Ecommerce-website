import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Header.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { Dropdown, Space, Input } from "antd";

export default function Header() {
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const email = localStorage.getItem("email"); //first we check email is get or not in application inspect.......
  console.log("email in navbar", email);
  const handleLogout = () => {
    console.log("handleLogout function called on click");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("userCardData");
    const email = localStorage.getItem("email");
    console.log("email", email);
    if (!email) {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:8000/specificUser/${email}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("backend success response", res);
          setName(res?.data?.data?.name);
        })
        .catch((error) => {
          console.log("backend error response", error);
        });
    }
  }, [email]);
  //its javascript of antdesign part //
  const items = [
    {
      label: <Link to="/userDetails">My Profile</Link>,
      key: "0",
    },
    {
      label: <Link to='order'>Orders</Link>,
      key: "1",
    },
    {
      label: <Link to="/cart">Cart</Link>,
      key: "3",
    },

    {
      label: <Link to="/cartitem">Cart Item</Link>,
      key: "4",
    },
    {
      type: "divider",
    },
  ];
  // const SearchFilter=({data})=>{
  //   const [searchQuery,setSearchQuery]=useState('');
  //   const filteredData= filteredData(data,searchQuery);
  // }
  const { Search } = Input;
  

  const onSearch = (value) => console.log(value);
  return (
    //Navbar--------------------------------------------
    <div>
      <div>
        <div className="main">
          <label id="logo1">OneTech+</label>
          {email ? (
            <div id="search1">
              <Search
                placeholder="input search text"
                size="large"
                // suffix={suffix}
                onSearch={onSearch}
              />
            </div>
          ) : (
            ""
          )}
          <div className="cart">
            {email ? (
              <span>
                <img src="cart.png" className="imgcart" alt="" />
                <span>
                  <Link to="/cart" style={{ textDecoration: "none" }}>
                    Cart
                  </Link>
                </span>
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="signbtn">
            {email ? (
              <span></span>
            ) : (
              <button>
                <Link
                  to="/registration"
                  style={{
                    cursor: "pointer",
                    color: "#000",
                    textDecoration: "none",
                  }}
                >
                  Sign Up
                </Link>
              </button>
            )}
            {email ? (
              <button>
                <Link
                  to="/login"
                  onClick={handleLogout}
                  style={{ textDecoration: "none" }}
                >
                  Logout
                  <LogoutOutlined />
                </Link>
              </button>
            ) : (
              <button>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                  <LoginOutlined />
                </Link>
              </button>
            )}
          </div>
        </div>
        <div className="main2">
          <div className="main2-1">CATEGORIES</div>
          <div className="limain">
            <ul type="none">
              <li>Computers and Laptop</li>
              <li>Cameras and Photos</li>
              <li>Hardware</li>
              <li>Gadgets</li>
              <li>Smartphones & Tablets</li>
              <li>TV, Audio & Video</li>
              <li>Car Electronics</li>
              <li>Video Games & Consoles</li>
              <li>Accessories</li>
            </ul>
          </div>
          <div className="navbar">
            <ul type="none" className="nav_left">
              <li>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {email ? "Product" : "Home"}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  About
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/deals"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Super Deals
                </Link>
              </li>
              <li>
                <Link
                  to="/brand"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Featured Brands
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Blog
                </Link>
              </li> */}
              <li>
                <Link
                  to="contact"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Contact
                </Link>
              </li>
              <li>
                {/* its antdesign for droup down menu */}
                <div id="namesetting">
                  {email ? (
                    <Dropdown
                      menu={{
                        items,
                      }}
                      trigger={["click"]}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          {name}
                          <div
                            style={{
                              border: "2px solid black",
                              borderRadius: "50%",
                              padding: "3px 5px",
                              cursor: "pointer",
                            }}
                          >
                            {" "}
                            <UserOutlined />
                          </div>
                          <div
                            style={{ marginLeft: "40px", cursor: "pointer" }}
                          >
                            <SettingFilled />
                          </div>
                        </Space>
                      </a>
                    </Dropdown>
                  ) : (
                    " "
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className='imgwall'>
          <img src="Ecom.jpg" />
        </div> */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
