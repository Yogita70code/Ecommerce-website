import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";

export default function OrderConfirm(props) {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  var result = new Date();
  result.setDate(result.getDate() + 2);
  console.log("final Date", result);
  const exDate = result.toDateString();
  console.log("props data", props);
  const [isModalOpen, setIsModalOpen] = useState(props.isOpen);
  console.log("isModalOpen", isModalOpen);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    console.log("address,price,payment-mode,date", props.address, props.price, props.selectOption, exDate);
    const Id = Math.floor(Math.random(10) * 10);
    console.log("Id", Id);
    const orderID = `order_${Id}_Product_1_user_${email}`;
    axios.post(`http://localhost:8000/user/${email}/orderBooked`, {
      address: props.address,
      price: props.price,
      Payment_mode: props.selectOption,
      Delivery_date: exDate,
      orderId: orderID,
      status: "Placed",

    },
      {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => {
        if (res.data.status == 1) {
          console.log("backend response in OrderConfirm.js", res);
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.message,
            ShowConfirmButton: false,
            timer: 1500,
          });
          setTimeout(function () {
            navigate("/")
          }, 2000)
        } else {
          console.log("backend response in OrderConfirm.js", res);
          Swal.fire({
            position: "center",
            icon: "error",
            title: res.data.message,
            ShowConfirmButton: false,
            timer: 1500,
          });
        }


      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Network error",
          ShowConfirmButton: false,
          timer: 1500,
        });
      })
    props.fun(false);
  };
  const handleCancel = () => {
    var text = window.confirm("Are you sure you want to cancel");
    if (text) {
      setIsModalOpen(false);
      props.fun(false);
    }
  };
  useEffect(() => {
    if (props.status == '1') {
      showModal()
    }
  }, [])
  return (
    <div>
      <Modal title="Order-Invoice" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Address:{props.address}</p>
        <p>Payment:{props.selectOption == '1' ? "Cash on Delivery" : props.selectOption == '2' ? "UPI" : "Net Banking"}</p>
        <p>Product Price:{props.price}</p>
        <p>Expected Deliver Date:{exDate}</p>
      </Modal>
    </div>
  )
}
