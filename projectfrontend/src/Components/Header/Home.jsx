import React, { useEffect, useState, } from "react";
import { Card, Carousel } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [publicHome, setPublicHome] = useState(true);
  const [role, setRole] = useState("");
  console.log("role", role);
  console.log("email", email);
  const contentStyle = {
  };
  const productData = [
    {
      id: "1",
      name: "Mobile",
      img: "mobiles.jpeg",
      price: "15000",
      discount: "25%",
    },
    {
      id: "2",
      name: "TV",
      img: "TV's.jpeg",
      price: "12000",
      discount: "15%",
    },
    {
      id: "3",
      name: "AC",
      img: "ac.jpg",
      price: "55000",
      discount: "25%"
    },
    {
      id: "4",
      name: "Refrigeator",
      img: "ref.jpeg",
      price: "25000",
      discount: "25%"
    },
    {
      id: "5",
      name: "Speaker",
      img: "speaker.jpeg",
      price: "25000",
      discount: "15%"
    },
    {
      id: "6",
      name: "Washingmachine",
      img: "wash.jpeg",
      price: "15000",
      discount: "25%"
    },
    {
      id: "7",
      name: "Earphones",
      img: "earphn.jpg",
      price: "500",
      discount: "10%"
    },
    {
      id: "8",
      name: "Camera",
      img: "camera.jpeg",
      price: "2500",
      discount: "25%"
    },
  ];
  // const onChange = (key) => {
  //   console.log(key);
  // }
  // const items = [
  //   {
  //     key: '1',
  //     label: 'Create New Product',
  //     Children: (<h1>hello</h1>)
  //   },
  //   {
  //     key: '2',
  //     label: 'My Product',
  //     Children: 'Content of Tab Pane 2',
  //   },
  // ]
  useEffect(() => {
    if (email) {
      // setPublicHome(false);
      axios.get(`http://localhost:8000/specificUser/${email}`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Backend server successfully", res);
          setRole(res?.data?.data.role);
          setPublicHome(false);
        }).catch((err) => {
          console.log("backend error", err);
        });

    }
  }, [email])
  return (

    <div>
      {publicHome ?
        <div>
          <div id="carousel">
            <Carousel autoplay>
              <div className="image1">
                <h3 style={contentStyle}><img src="online.png" alt="" /></h3>
              </div>
              <div className="image1">
                <h3 style={contentStyle}><img src="image.jpeg" alt="" /></h3>
              </div>
            </Carousel>
          </div>
        </div> : productData.map((x) => {
          return (

            < Link to={`/product/Id/${x.id}`}>
              <Card
                className="Product_box"
                title={x.name}
                style={{ cursor: "pointer" }}
                height="350"

              >
                <img src={x.img} width="100%" height={200} style={{ objectFit: "fill" }} />
                <p>Price Rs.{x.price}</p>
                <p>Discount:-{x.discount}</p>
                <p>
                  Total Amount:-
                  {parseInt(x.price) -
                    (parseInt(x.price) * parseInt(x.discount)) / 100}
                </p>
                <div style={{ marginTop: "10px" }}>
                  <Link to="/product">
                    {" "}
                    <button style={{ cursor: "pointer", backgroundColor: "red", border: "1px solid black", borderRadius: "4px", fontSize: "15px", padding: "3px", color: "white" }}>Add Cart</button>
                  </Link>
                  <button style={{ cursor: "pointer", marginLeft: "60px", backgroundColor: "blue", border: "1px solid black", borderRadius: "4px", fontSize: "15px", padding: "3px", color: "white" }}>
                    Buy
                  </button>
                </div>
              </Card>
            </Link>

          );
        })}
       <div>
        <Footer/>
       </div>
       
    </div>

  );

}

