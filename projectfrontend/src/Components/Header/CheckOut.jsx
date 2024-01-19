import React, { useState, useEffect } from 'react'
import { Col, Row, Card } from 'antd';
import { useParams, } from "react-router-dom";
import "./CheckOut.css"
import OrderConfirm from './OrderConfirm';
export default function CheckOut() {
  const [address, setAddress] = useState("Lig 146 Mukherjee Nagar Dewas");
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
  const [checkoutProduct, setCheckoutProduct] = useState([productData[0]]);
  const [details, setDetails] = useState(false);
  const [selectOption, setSelectOption] = useState("");
  const [isContinue, setIsContinue] = useState(false);
  const [selectAddress, setSelectAddress] = useState(false);
  
  const { id } = useParams("");
  useEffect(() => {
    setCheckoutProduct(productData[id - 1]);
  }, [])
  const handleOptionChange = (e) => {
    console.log("worked", e.target.value);
    if (e.target.value == "1") {
      setDetails(true);
      setSelectOption(e.target.value);
    }
    else if (e.target.value == "2") {
      setDetails(true);
      setSelectOption(e.target.value);
    }
    else {
      setDetails(true);
      setSelectOption(e.target.value);
    }
  }
  //handleContinue

  const handleContinue = () => {
    console.log("handleContinue worked");
    setIsContinue(true);
  };

  const handleAddressChange = (e) => {
    console.log("handleAddressChange worked", e.target.value);
    setAddress(e.target.value);
    setSelectAddress(true);
  };
  const getData = (a) => {
    setIsContinue(false);
  }

  return (
    <div>
      <Row>
        <Col span={12}>
          <h3 style={{ marginLeft: "130px", marginTop: "10px" }}>Payment Process</h3><br />
          < div>
            {/* {checkoutProduct.map((x) => {
              return ( */}
            <div style={{marginLeft:"94px"}}> 
              <img src={`../../${checkoutProduct.img}`} />
            </div>
          </div>
        </Col>
        <Col span={12}>
          < div style={{ marginTop: "-10px", marginLeft: "-190px", borderRadius: "15px", width: "500px", backgroundColor: "#E6F4FF" }}>
            <h3 style={{ margin: "60px 0px 0px 40px", }}>Address</h3>
            <br />
            <input style={{ marginLeft: "36px" }} type='radio' value={address} onChange={(e) => { handleAddressChange(e) }}></input>
            <span>{address}</span> <br />
            <br />
            <h3 style={{ marginLeft: "36px" }}>Payment Options</h3>
            <br />
            <ul type="none" style={{ marginLeft: "36px" }}>
              <li>
                <input type='radio' name="payment" value="1" onChange={(e) => handleOptionChange(e)}></input>
                <span>Cash on Delivery</span>
                {details && selectOption == '1' ? <p style={{ border: "2px solid grey", borderRadius: "5px", padding: "4px", fontWeight: "bold" }}>product price =9874</p> : ""}
              </li><br />
              <li>
                <input type='radio' name='payment' value="2" onChange={(e) => handleOptionChange(e)}></input>
                <span>UPI</span>
                {details && selectOption == '2' ? <p style={{ border: "2px solid grey", borderRadius: "5px", padding: "4px", fontWeight: "bold" }}>Product Price + delivery Charge=10350</p> : ""}
              </li> <br />
              <li>
                <input type='radio' name='payment' value="3" onChange={(e) => handleOptionChange(e)}></input>
                <span>Net Banking</span>
                {details && selectOption == '3' ? <p style={{ border: "2px solid grey", borderRadius: "5px", padding: "4px", fontWeight: "bold" }}>Product price Delivery Charge + platform charge=10030</p> : ""}
              </li><br />
            </ul>
            <br />
            {selectOption && selectAddress ? <button style={{
              cursor: "pointer",
              backgroundColor: "#87CEFA",
              color: "black",
              textDecoration: "none",
              border: "none",
              borderRadius: "5px",
              padding: "5px 5px",
              marginLeft: "36px"
            }} onClick={handleContinue}>Continue</button> : ""}
            {isContinue ? <OrderConfirm status="1" isOpen='true' selectOption={selectOption} address={address} name={productData[id - 1].name} price={productData[id-1].price} fun={getData} /> : ""}

          </div>
        </Col>
      </Row>


    </div>


  )
}
