import React, {useEffect,useState} from 'react';
import { Table } from 'antd';
import axios from 'axios';


export default function Order() {
  const email=localStorage.getItem('email');
  const [data,setData]=useState([]);
  // const [name,setName]=useState("");
  console.log("email",email);
  console.log("data in order.jsx",data);
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
    const dataSource = data.map((elemt,index)=>{
      return(
        {
          key: index,
          name: elemt.name,
          address: elemt.address,
          price: elemt.price,
          mode:elemt.Payment_mode,
          date:elemt.Delivery_date,
          
        }
      )
    });
      
      const columns = [
        {
          title: 'Product Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'orderId',
          dataIndex: 'orderId',
          key: 'orderId',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Payment mode',
          dataIndex: 'mode',
          key: 'mode',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Delivery Date',
          dataIndex: 'date',
          key: 'date',
        },
      ];
      const getOrderData = () => {
        axios.get(`http://localhost:8000/user/${email}/orderDetails`)
          .then((res) => {
            console.log("backend order details response", res);
            if (res.data.status === 1) {
              // setName(productData[res.data.orderDetail[0].product_id - 1].name);
              setData(res?.data?.orderFind);
            } 
          })
          .catch((err) => {
            console.log("backend order details error", err);
          });
      }; 
      useEffect(() => {
        getOrderData();
      }, []);
      
  return (
    <div>
         <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
}
