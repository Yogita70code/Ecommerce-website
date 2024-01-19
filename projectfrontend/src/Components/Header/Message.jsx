import React ,{useState} from 'react'
import { useNavigate} from 'react-router-dom'
import Swal from "sweetalert2"

export default function Message(props) {
    const navigate = useNavigate()
    const [openModel,setOpenModel]=useState(true);
    console.log("openModel",openModel);
    Swal.fire({
        position:"center",
        icon: props.status==1?"success":"error",
        title: props.message,
        ShowConfirmButton: true,
    });

  return (
    <></>
  )
}
