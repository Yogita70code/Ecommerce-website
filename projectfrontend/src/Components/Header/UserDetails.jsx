import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'
//userDetails (profile page..)
export default function UserDetails() {
    // const [image,setImage]=useState("");
    // const[showImage,setShowImage]=useState(false);
    // const email=localStorage.getItem("email");
    // console.log("image data on change",image);
    // const handleUpload=(e)=>{
    //   // e.preventDefault(); used to stop the refreshment of page or re-rendring of page..
    //   //formData- object as the request body.
    //   const formData= new FormData();
    //   formData.append('image', e.target.files[0]);
    //     console.log("image upload worked",e);
    //     setImage(e.target.files[0]);
    //     axios.post(`http://localhost:8000/userUpload/${email}`,formData,{
    //       headers: {
    //         Authorization: `${localStorage.getItem("token")}`,
    //         "Content-Type": "multipart/form-data",//it upload the file like (image , video, audio) into the server.. 
    //       },
    //     }).then((res)=>{
    //       console.log("backend succes response",res);
    //     }).catch((error)=>{
    //       console.log("backend error response",error)
    //       throw new Error(error);//its a type of error syntax which is used to show error on our UI.. 
    //     })
    // }
    //Update Profile
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const[address,setAddress]=useState("");
    const email=localStorage.getItem("email");
    const handleUpdate=()=>{
      console.log("data",name,address);
       axios.post(`http://localhost:8000/update/${email}`,{name,address},{
        headers:{
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type":"multipart/form-data",
        }
       })
       .then((res)=>{
        console.log("backend response",res);
        if (res?.data?.status==1){
          console.log("backend response",res);
          return;
        }
       })
       .catch((err)=>{
        console.log("backend errror",err);
       });
    }
    
  return (
    <div>
      <div style={{border:"2px solid black", marginTop:"50px", width:"600px", marginLeft:"350px",height:"200px",padding: "50px 50px 75px 100px"}}>
      {/* //upload photo */}
        {/* <label>Upload Photo</label>
        <input type="file" onChange={(e)=>handleUpload(e)}></input> */}
        {/* {showImage?<img src={`${image.name}`}></img>:""} */}
        <div><label htmlFor="name">Name</label>
       <input type="text" value={name}name='name' onChange={(event)=>{setName(event.target.value)}}></input>
       </div>
       <br />
       <div><label htmlFor="email">Email</label>
       <input type="email" value={email}name='email' readOnly></input>
       </div>
       <br />
       <div><label htmlFor="address">Address</label>
       <input type="address" value={address}name='address' onChange={(event)=>{setAddress(event.target.value)}}></input>
       </div>
       <br />
       <button onClick={handleUpdate} style={{cursor: "pointer",
                backgroundColor:"#87CEFA",
                color: "black",
                textDecoration:"none",
                border:"none",
                borderRadius:"5px",
                padding:"5px 5px"
                }}>Update Profile</button>
    </div>
    </div>
  )
}
