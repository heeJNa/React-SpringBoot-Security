import React,{Fragment,useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "./css/FoodDetail.css"
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Map from "../map/Map";


const FoodDetail=()=>{
    const [foodDetail,setFoodDetail] = useState({})
    let {fno}=useParams();
    let {type}=useParams();
    // no에 해당되는 데이터를 서버로부터 읽기
    useEffect(()=>{
        axios.get("http://localhost:8080/food/detail",{
            params:{
                no:fno,
                type:type
            }
        }).then(res=>{
            console.log(res.data)
            setFoodDetail(res.data)
        })

    },[fno])
    // 주소 자르기
    let address=String(foodDetail.address);
    const addrArr=address.split(" ");
    let mapAddr='';
    for(let i=0;i<4;i++){
        mapAddr += addrArr[i]+' '
    }
    // poster 자르기
    let poster=String(foodDetail.poster);
    const img =poster.split("^");
    let posterList=img.map((m,index)=>(
        <td key={index}><img  src={m} style={{"width":"100%"}} alt={""}/></td>
    ))
    // menu 자르기
    let menu=String(foodDetail.menu);
    let menuList='';
    if(menu!=='no'){
        const m = menu.split("원 ");
        menuList=m.map((k,index)=>{
        if(k.lastIndexOf(")")==-1){
            return(
                <li key={index}>{k.substring(0,k.indexOf(" "))}
                    <span className={"menu_price"}>{k.substring(k.indexOf(" ")+1)}원</span>
                </li>
            )
        }else{
            return(
                <li key={index}> {k.substring(0,k.lastIndexOf(")")+1)}
                    <span className={"menu_price"}>{k.substring(k.lastIndexOf(")")+1)}원</span>
                </li>
            )
        }
    })
    }else{
        menuList='등록이 안됨'
    }
    const parking = () =>{
        if(foodDetail.parking!=='no') {
            return (
                <tr>
                    <th width={"15%"} style={{"color": "gray"}}>주차</th>
                    <td width={"85%"}>{foodDetail.parking}</td>
                </tr>
            )
        }
        return null
    }
    const menuTr = () =>{
        if(foodDetail.menu!=='no') {
            return (
                <tr>
                   <th width={"15%"} style={{"color":"gray"}}>메뉴</th>
                        <td width={"85%"}>
                            <ul className={"menuList"}>
                                {menuList}
                            </ul>
                        </td>
                </tr>
            )
        }
        return null
    }
    const time = () =>{
        if(foodDetail.time!=='no'){
            return(
                <tr>
                    <th width={"15%"} style={{"color":"gray"}}>영업 시간</th>
                    <td width={"85%"}>{foodDetail.time}</td>
                </tr>
            )
        }
        return null
    }
    const price = () =>{
        console.log(foodDetail.price)
        if(foodDetail.price!=='no'){
            return(
                <tr>
                    <th width={"15%"} style={{"color":"gray"}}>가격</th>
                    <td width={"85%"}>{foodDetail.price}</td>
                </tr>
            )
        }else{
            console.log("return")
            return null
        }

    }
     const score = () =>{
        if(foodDetail.score===0){
            return(
                null
            )
        }else{
            return(
                foodDetail.score
            )
        }
    }

    return(
        <Fragment>
            <div className={"row"}>
                <table className={"table"}>
                    <tbody>
                        <tr>
                            {posterList}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-lg-8"}>
                        <table>
                            <tbody>
                            <tr className={"food_detail_title"}>
                                <td colSpan={"2"}>
                                    <h4>{foodDetail.name+" "}<span style={{"color":"orange"}}>{score()}</span></h4>
                                </td>
                            </tr>
                            <tr className={"food_detail_state"}>
                                <td colSpan={"2"}>
                                    <span><SentimentVerySatisfiedIcon /><em>{foodDetail.good}</em></span>
                                    <span><SentimentNeutralIcon /><em>{foodDetail.soso}</em></span>
                                    <span><SentimentVeryDissatisfiedIcon /><em>{foodDetail.bad}</em></span>
                                </td>
                            </tr>
                            <tr style={{"height":"20px"}}></tr>
                            <tr className={"address"}>
                                <th width={"15%"} style={{"color":"gray"}}>주소</th>
                                <td width={"85%"}>
                                    <span>{String(foodDetail.address).substring(0,String(foodDetail.address).lastIndexOf("지번"))}</span>
                                    <br/>
                                    <span className={"jibun"}>지번</span>
                                    <span>{String(foodDetail.address).substring(String(foodDetail.address).lastIndexOf("지번")+3)}</span>
                                </td>
                            </tr>
                            <tr>
                                <th width={"15%"} style={{"color":"gray"}}>전화</th>
                                <td width={"85%"}>{foodDetail.tel}</td>
                            </tr>
                            <tr>
                                <th width={"15%"} style={{"color":"gray"}}>음식 종류</th>
                                <td width={"85%"}>{foodDetail.type}</td>
                            </tr>
                            {price()}
                            {parking()}
                            {time()}
                            {menuTr()}
                            </tbody>
                        </table>
                    </div>
                    <div className={"col-lg-4"}>
                        <Map data={foodDetail} addr={{mapAddr}}/>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default FoodDetail