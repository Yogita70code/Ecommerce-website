import React,{useState,useEffect} from 'react'
import Swal from "sweetalert2"
import {Card ,Empty} from "antd"

export default function Cart() {
  const userCardDetails=localStorage.getItem("userCardData");//ther we can check cartdata is get or not in localstorage.(This line retrieves data from the browser's local storage)
  const [cartData, setCartData]=useState([]);//its a empty array..(This state will be used to store and manage the user's shopping cart.)
  console.log("userCardDetails",userCardDetails);
  const parseuserCartData=  JSON.parse(userCardDetails);//This line attempts to parse the data retrieved from local storage as a JSON object. This will convert the stored JSON string back into a JavaScript object.
  //HandleProducrRemove==This function is called when the user wants to remove all items from their cart. It removes the data from local storage, displays a success message using Swal, and sets the cartData state to an empty array.
  const handleProductRemove=()=>{
    console.log("handleProductRemove worked");
    localStorage.removeItem("userCartData"); //here we remove the data from localstorage.
    const data =localStorage.getItem("userCartData");
    if(!data){
      //Swal is a library for displaying pop-up messages...
      Swal.fire({
        position:"center",
        icon: "success",
        title: "Deleted Successfully",
        ShowConfirmButton: false,//without clicking of Ok button..use false
        timer:1500 // it's a timer to render the page without press ok button..
    });
    }
    setCartData([]);
  };
  //here with the use of useEffect because component render k phle check krle ki localstorage m data (cartData) h ya nhi agr nhi h to vh without refreshement page ko render krdeta h..
  //(This useEffect is used to initialize the cartData state when the component mounts and whenever userCardDetails changes (likely when items are added/removed from the cart). It sets cartData to the parsed data from local storage.)
  useEffect(()=>{
    setCartData(parseuserCartData);
  },(userCardDetails));
  
  return (
    <div>Cart Details
      <div>
        {cartData?.length >0? cartData.map((x)=>{
          return (
            <Card
          className="Product_box"
          title={x.name}
          style={{ cursor: "pointer" }}
          height="350"
        >
          <img
            src={`../../${x.img}`}
            width="100%"
            height={200}
            style={{ objectFit: "fill" }}
          />
          <p>Price Rs.{x.price}</p>
          <p>Discount:-{x.discount}</p>
          <p>
            Total Amount:-
            {parseInt(x.price) -
              (parseInt(x.price) *
                parseInt(x.discount)) /
                100}
          </p>
            <div style={{ marginTop: "10px", marginLeft:"5px" }}>
            <button  style={{
                  cursor: "pointer",
                  backgroundColor: "green",
                  border: "1px solid black",
                  borderRadius: "4px",
                  fontSize: "15px",
                  padding: "3px",
                  color: "white",
                }}>See Details..</button>
            <button onClick={handleProductRemove}  style={{
                  cursor: "pointer",
                  backgroundColor: "red",
                  border: "1px solid black",
                  borderRadius: "4px",
                  fontSize: "15px",
                  padding: "3px",
                  color: "white",
                  marginLeft:"25px"
                }}>Remove</button>
          </div>
        </Card>
          )
        }):<Empty description={false} style={{marginTop:"60px"}}/>
      }
      </div>
    </div>
  )
}
