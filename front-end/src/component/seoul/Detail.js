import React,{useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
const Detail = () => {
  let{no}=useParams();
  let{type}=useParams()
  const [detail,setDetail] = useState({});

  useEffect(()=>{
    axios.get("http://localhost:8080/seoul/detail",{
      params:{
        no:no,
        type:type
      }
    }).then(res=>{
      console.log(res.data);
      setDetail(res.data)
    })
  },[])

}

export default Detail