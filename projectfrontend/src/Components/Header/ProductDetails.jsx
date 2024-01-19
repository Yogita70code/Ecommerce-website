import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "antd";
import Swal from "sweetalert2"

export default function ProductDetails() {
  const [productDataDetails, setProductDataDetails] = useState("");
  const productData = [
    {
      id: "1",
      name: "Mobile",
      img: "mobiles.jpeg",
      price: "15000",
      discount: "25%",
      description: [
        "4 GB RAM | 64 GB ROM | Expandable Upto 2 TB",
        "17.12 cm (6.74 inch) HD Display",
        "50MP + 0.08MP | 5MP Front Camera",
        "5000 mAh Battery",
        "T612 Processor",
      ],
      reviews: [
        "very good thanks flipkarts",
        "good camera quality",
        "nice product",
        "battery service is not good",
      ],
    },
    {
      id: "2",
      name: "TV",
      img: "TV's.jpeg",
      price: "12000",
      discount: "15%",
      description: [
        "Supported Apps: Netflix|Prime Video|Disney+Hotstar|Youtube",
        "Operating System: Android (Google Assistant & Chromecast in-built)",
        "Resolution: HD Ready 1366 x 768 Pixels",
        "Sound Output: 20 W",
        "Refresh Rate: 60 Hz",
      ],
      reviews: [
        "very good thanks flipkarts",
        "Awesome tv",
        "nice product",
        "not good screen",
      ],
    },
    {
      id: "3",
      name: "AC",
      img: "ac.jpg",
      price: "55000",
      discount: "25%",
      description: [
        "1.5 Ton",
        "3 Star BEE Rating 2023",
        "Auto Restart:",
        "Copper",
        "Sleep Mode:",
      ],
      reviews: [
        "Very Good product",
        "There is some problem with the serial number.",
        "very good thanks flipkarts",
      ],
    },
    {
      id: "4",
      name: "Refrigeator",
      img: "ref.jpeg",
      price: "25000",
      discount: "25%",
      description: [
        "184 L : Good for couples and small families",
        "DC Inverter Compressor",
        " 4 Star : For Energy savings up to 45%",
        "Direct Cool : Economical, consumes less electricity, requires manual defrosting",
        "Base Stand with Drawer : For storing items that don't need cooling (Onion, Potato etc.)",
      ],
      reviews: [
        "Very Good product",
        "Nice Refrigerator good looking",
        "very good thanks flipkarts",
      ],
    },
    {
      id: "5",
      name: "Speaker",
      img: "speaker.jpeg",
      price: "25000",
      discount: "15%",
      description: [
        "Power Output(RMS): 10 W",
        "Battery life: 12 hrs",
        "Bluetooth Version: 5",
        "Wireless range: 10 m",
        "Wireless music streaming via Bluetooth",
        "IPX7: Splash and Sweat Shield",
        "Multiple Connectivity: BT, TF Card and AUX",
      ],
      reviews: [
        "Awesome product ",
        "Sound quality awesome ",
        "very good thanks flipkarts",
      ],
    },
    {
      id: "6",
      name: "Washing-Machine",
      img: "wash.jpeg",
      price: "15000",
      discount: "25%",
      description: [
        "Semi Automatic Top Load",
        "1350 rpm : Higher the spin speed, lower the drying time",
        "5 Star Rating",
        "7 kg",
      ],
      reviews: [
        "Awesome product ",
        "Price worth product",
        "Water pressure is little slow",
      ],
    },
    {
      id: "7",
      name: "Earphones",
      img: "earphn.jpg",
      price: "500",
      discount: "10%",
      description: [
        "Battery life: 40 hrs",
        "13.6mm Dynamic Titanized Bass Driver",
        "30dB ANC with 360 degree Spatial Audio Effect | realme Link App Connectivity",
        "Upto 40 Hours Battery Life | Fast-charging support of 10 min charging for 25 hours playback",
        "45ms ultra-low latency | Bluetooth 5.3 | IP55 Dust and Water Resistance",
        "Dual device",
        "Connection with Google Fast Pairing",
      ],
      reviews: ["Awesome product ", "Price worth product", "nyc one"],
    },
    {
      id: "8",
      name: "Camera",
      img: "camera.jpeg",
      price: "2500",
      discount: "25%",
      description: [
        "Self-Timer, Type C and Mini HDMI, 9 Auto Focus Points",
        "3x Optical Zoom, WiFi, Full HD, Video Recording at 1080 p on 30fps",
        "APS-C CMOS sensor-which is 25 times larger than a typical Smartphone sensor.",
        "Effective Pixels: 18 MP",
        "Sensor Type: CMOS",
        "WiFi Available",
        "Full HD",
      ],
      reviews: ["Awesome product ", 
      "Price worth product", 
      "nyc one"],
    },
  ];
  //This initializes an empty array called cartData, which will be used to store products added to the user's shopping cart.
  const cartData=[]
  //This function is called when the "Add to Cart" button is clicked. It checks if there is existing cart data in local storage, and if so, it adds the current product to it. If there is no existing cart data, it initializes the cart data and adds the current product.
  const handleAddCart=()=>{
  const data =localStorage.getItem("useCartData");
  console.log("data",data);
  const parseData=JSON.parse(data);
  console.log("parseData",parseData);
  if(parseData){
    const stringData=parseData.push(productDataDetails);
    localStorage.setItem("userCardData",stringData);
  }
  else{
    console.log("add successfully");
    cartData.push(productDataDetails);
    const stringCartData=JSON.stringify(cartData);
    console.log("cartData",cartData);
    localStorage.setItem("userCardData",stringCartData);
    Swal.fire({
      position:"center",
      icon:"success",
      title: "Added Succesfully",
      ShowConfirmButton: true,
  });
  }
}
  //code for fetching and setting product details based on the ID
  useEffect(() => {
    console.log("product data by id", productData[id - 1]);

    setProductDataDetails(productData[id - 1]);
  }, []);
//This line uses the useParams hook from react-router-dom to retrieve the id parameter from the URL. This id is used to identify which product's details should be displayed.
  const { id } = useParams();
  console.log("id", id);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Card
          className="Product_box"
          title={productDataDetails.name}
          style={{ cursor: "pointer" }}
          height="350"
        >
          <img
            src={`../../${productDataDetails.img}`}
            width="100%"
            height={200}
            style={{ objectFit: "fill" }}
          />
          <p>Price Rs.{productDataDetails.price}</p>
          <p>Discount:-{productDataDetails.discount}</p>
          <p>
            Total Amount:-
            {parseInt(productDataDetails.price) -
              (parseInt(productDataDetails.price) *
                parseInt(productDataDetails.discount)) /
                100}
          </p>
          <div style={{ marginTop: "10px" }}>
            <Link >
              {" "}
              <button
                style={{
                  cursor: "pointer",
                  backgroundColor: "red",
                  border: "1px solid black",
                  borderRadius: "4px",
                  fontSize: "15px",
                  padding: "3px",
                  color: "white",
                }}
                onClick={handleAddCart}
              >
                Add Cart
              </button>
            </Link>
            <Link to={`/checkout/id/${id}`}>
            <button
              style={{
                cursor: "pointer",
                marginLeft: "60px",
                backgroundColor: "blue",
                border: "1px solid black",
                borderRadius: "4px",
                fontSize: "15px",
                padding: "3px",
                color: "white",
              }}
            >
              Buy
            </button>
            </Link>
          </div>
        </Card>
        <div style={{ marginTop: "40px", marginLeft: "230px" , borderRadius:"15px", width:"600px" ,backgroundColor:"#E6F4FF"}}>
          {" "}
          {productDataDetails?.reviews?.length > 0 ? (
            <p style={{ fontWeight: "750", margin:"30px 0px 0px 30px"}}>Details:</p>
          ) : (
            ""
          )}
          {productDataDetails?.description?.map((detail) => {
            return (
              <ul type="none" style={{marginLeft:"30px" }}>
                <li>{detail}</li>
              </ul>
            );
          })}
          {productDataDetails?.reviews?.length > 0 ? (
            <span style={{ fontWeight: "750" ,marginLeft:"30px"}}>Reviews:</span>
          ) : (
            ""
          )}
          {productDataDetails?.reviews?.length > 0
            ? productDataDetails?.reviews?.map((review) => {
                return (
                  <ul type="none" style={{marginLeft:"30px" }}>
                    <li>{review}</li>
                  </ul>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}
