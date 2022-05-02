import React,{Component,Fragment,useState,useEffect} from "react";
import ControlledCarousel from "./ControlledCarousel";
import './layout/styles/home.css'
import {Link} from "react-router-dom";
import {Carousel,Form,FormSelect} from "react-bootstrap";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
    const [option,setOption] = useState('서울 명소');
    const [keyword,setKeyword] = useState('')
    
    const onChangeHanlder=(e)=>{
        setOption(e.currentTarget.value)
    }
    const onChangeKeyword = (e) => {
      setKeyword(e.target.value)
        console.log(keyword)
    }
    const Options =[
        {key:1, value:"서울 명소"},
        {key:2, value:"서울 맛집"},
        {key:3, value:"자연&관광"},
        {key:4, value:"서울 호텔"}
    ]
    const search = () => {
        if (keyword.trim()===''){
            alert("검색어를 입력하시오")
            return
        }
        console.log(option)
        if(option==='서울 명소'){
            window.location.replace("/seoul/location/1/"+keyword)
        }else if(option==='자연&관광'){
            window.location.replace("/seoul/location/2/"+keyword)
        }else if(option==='자연&관광'){
            window.location.replace("/seoul/location/3/"+keyword)
        }else{
            // 아직 검색기능 미구현
            window.location.replace("/food/menu/")
        }
    }
    return(
        <div className={"home-wrap"}>
            <Carousel>
                <Carousel.Item>
                    <img src={"https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=50385&fileTy=MEDIA&fileNo=1"}/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={"https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=50386&fileTy=MEDIA&fileNo=1"}/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={"https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=50387&fileTy=MEDIA&fileNo=1"}/>
                </Carousel.Item>
            </Carousel>
            <div className={"main-searchbar"}>
                <Form.Select onChange={onChangeHanlder} value={option}>
                    {Options.map((item, index)=>(
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </Form.Select>
                <Form.Control type="text" size="lg" placeholder="서울을 알아보세요" onChange={onChangeKeyword} value={keyword}/>
                <button  onClick={search} className={"search-btn"}>
                    <SearchIcon fontSize={"large"} opacity={"0.4"}/>
                </button>
            </div>
            <div className="wrapper row2 seoul_tour_warp">
                <div className={"seoul_tour_title"}>
                    <h2>서울 여행지</h2>
                </div>
                <div id="services" className="clear">
                    <div className="group" id={"seoul_group"}>
                        <div className="one_third first">
                            <article className="service">
                                <img src={"images/demo/seoul/seoul_location.jpeg"} style={{"width":"340px","height":"200px"}}/>
                                <p><Link to="seoul/location/1/all">서울 명소 더 보기 &raquo;</Link></p>
                            </article>
                        </div>
                        <div className="one_third">
                            <article className="service">
                                <img src={"images/demo/seoul/seoul_nature.jpeg"} style={{"width":"340px","height":"200px"}}/>
                                <p><Link to="seoul/location/2/all">서울 자연/관광 더 보기 &raquo;</Link></p>
                            </article>
                        </div>
                        <div className="one_third">
                            <article className="service">
                                <img src={"images/demo/seoul/seoul_hotel.jpeg"} style={{"width":"340px","height":"200px"}}/>
                                <p><Link to="seoul/location/3/all">서울 호텔 더 보기 &raquo;</Link></p>
                            </article>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
            <div className="wrapper">
                <ControlledCarousel/>
            </div>
    </div>
    )
}

export default Home