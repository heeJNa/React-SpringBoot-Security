import React, {useEffect, useState,Fragment} from "react";
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";
import './css/FoodCateDetail.css'
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function FoodCateDetail() {
    const [foodList,setFoodList]=useState([])
    const [info,setInfo]=useState({})

    let {cno} = useParams();
    useEffect(()=>{
        axios.get("http://localhost:8080/food/food_cateDetail",{
            params:{
                cno:cno
            }
        }).then(res=>{
            console.log(res.data)
            setFoodList(res.data)
        })
    },[])
    useEffect(()=>{
        axios.get("http://localhost:8080/food/cate_info",{
            params:{
                cno:cno
            }
        }).then(res=>{
            console.log(res.data)
            setInfo(res.data)
        })
    },[])

        let html = foodList.map((food, index) => (
            <table key={index} className={"table foodlist_table"}>
                <tbody>
                <tr>
                    <td className={"text-center"} width={"30%"} rowSpan={"4"}>
                        <NavLink to={"/food/detail/" + food.fno+"/"+2}>
                            <img src={food.poster} style={{"width": "220px", "height": "220px"}}/>
                        </NavLink>
                    </td>
                    <td width={"70%"} colSpan={"2"} className={"nameTr"}>
                        <NavLink to={"/food/detail/" + food.fno+"/"+2}>
                            <h3>{index+1}.&nbsp;{food.name}</h3>
                        </NavLink>
                        <span className={"score"}>&nbsp;&nbsp;&nbsp;{food.score}</span>
                        <span className={"sentiment"}>
                            <span><SentimentVerySatisfiedIcon fontSize={"large"}/>
                                <em>{food.good}</em>
                            </span>
                            <span><SentimentNeutralIcon fontSize={"large"}/>
                                <em>{food.soso}</em>
                            </span>
                            <span><SentimentVeryDissatisfiedIcon fontSize={"large"}/>
                                <em>{food.bad}</em>
                            </span>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td width={"10%"} className={"text-left"}>주소</td>
                    <td width={"60%"}>
                        <span>{String(food.address).substring(0,String(food.address).lastIndexOf("지번"))}</span>
                        <br/>
                        <span className={"jibun"}>지번</span>
                        <span>{String(food.address).substring(String(food.address).lastIndexOf("지번")+3)}</span>
                    </td>
                </tr>
                <tr>
                    <td width={"10%"} className={"text-left"}>전화</td>
                    <td width={"60%"}>{food.tel}</td>
                </tr>
                <tr>
                    <td width={"10%"} className={"text-left"}>음식종류</td>
                    <td width={"60%"}>{food.type}</td>
                </tr>
                </tbody>
            </table>
        ))
        return (
            <Fragment>
                 <div className={"jumbotron"}>
                     <div className={"cateInfo"}>
                        <h2 className={"text-center"}>{info.title}</h2>
                        <h3 className={"text-center"}>{info.subject}</h3>
                     </div>
                </div>
                <div className={"container"}>
                    <div>
                        {html}
                    </div>
                </div>
            </Fragment>
        )
}
export default FoodCateDetail