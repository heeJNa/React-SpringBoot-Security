import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import './seoul_location.css'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import {ToggleButton} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Carousel} from "react-bootstrap";
import "./Modal.css";
import home from "../main/Home";


const Location = () => {
    let{homeKeyword}=useParams();
    let{type} = useParams();

    const navigate = useNavigate();
    const [seoulList,setSeoulList] = useState([]);
    const [pages,setPages] = useState({curpage:1, totalpage:0,count:0,startPage:1,endPage:5})
    const [expanded, setExpanded] = React.useState(false);
    const [selected, setSelected] = React.useState(false);
    const [keyword,setKeyword] = useState(homeKeyword);
    const [region,setRegion]= useState('전체');
    const [modalOpen, setModalOpen] = useState([false,false,false,false,false,false,false,false,false,false,false,false]);

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(()=>{
        setPages(prevState => {
            return{
                curpage: 1
            }
        })
    },[type])

    useEffect(()=>{
        {backend()}
    },[pages.curpage,type,region])

    const search = () => {
        setPages(prevState => {
            return{
                curpage: 1
            }
        })
        {backend()}
    }
    const backend = () =>{
        axios.get("http://localhost:8080/seoul/list",{
            params:{
                type:type,
                page:pages.curpage,
                keyword:keyword,
                region:region
            }
        }).then(res=>{
            console.log(res.data);
            if(res.data[0].msg==='noList'){
                alert('결과가 없습니다!')
                setKeyword('')
                setRegion('')
            }
            setSeoulList(res.data)
            setPages((prevState) => {
                return{
                    ...prevState,
                    totalpage: res.data[0].totalpage,
                    count : res.data[0].count,
                    startPage: res.data[0].startPage,
                    endPage: res.data[0].endPage
                }
            })
        })
    }
    // seoulList 출력
    const list = seoulList.map((s,index)=>{
        let tmp
        if(type==='3'){
            tmp = '';
        }else{
            tmp= <Typography variant="body2" color="text.secondary">
                    {s.msg}
                </Typography>
        }
        let imageArr=[];
        if(s.msg==null){
            imageArr.push(s.images.split("^"))
            console.log(typeof s.images)
            console.log(imageArr[0][0])
        }

        return(
            <div  key={index} className={"col-md-3 location-card"} data={s.no}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={s.poster}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {s.title}
                        </Typography>
                        {tmp}
                    </CardContent>
                    <CardActions>
                        <button onClick={()=>{
                            setModalOpen({
                                ...modalOpen,
                                [s.no]:true
                            })
                        }}>자세히 보기</button>
                        <div key={index} vo={s}>
                            <div key={index} className={modalOpen[s.no] ? 'openModal modal' : 'modal'}>
                                {modalOpen[s.no] ? (
                                    <section>
                                        <header>
                                            {s.title}
                                            <button className="close" onClick={closeModal}>
                                                &times;
                                            </button>
                                        </header>
                                        <main>
                                            {s.msg!==null?
                                            <img src={s.poster}/> :
                                                <Carousel  >
                                                    <Carousel.Item>
                                                        <img src={imageArr[0][0]}/>
                                                    </Carousel.Item>
                                                    <Carousel.Item>
                                                        <img src={imageArr[0][1]}/>
                                                    </Carousel.Item>
                                                    <Carousel.Item>
                                                        <img src={imageArr[0][2]}/>
                                                    </Carousel.Item>
                                                    <Carousel.Item>
                                                        <img src={imageArr[0][3]}/>
                                                    </Carousel.Item>
                                                    <Carousel.Item>
                                                        <img src={imageArr[0][4]}/>
                                                    </Carousel.Item>
                                                </Carousel>
                                             }
                                            <table className={"table"}>
                                                <tbody>
                                                    <tr>
                                                        <td width={"20%"}>장소명</td>
                                                        <td width={"80%"}>{s.title}</td>
                                                    </tr>
                                                    <tr>
                                                        <td width={"20%"}>주소</td>
                                                        <td width={"80%"}>{s.address}</td>
                                                    </tr>
                                                    {s.msg!==null?
                                                        <tr>
                                                            <td width={"20%"}>소개</td>
                                                            <td width={"80%"}>{s.msg}</td>
                                                        </tr>:
                                                        null
                                                    }
                                                </tbody>
                                            </table>

                                        </main>
                                        <footer>
                                            <button className="close" onClick={closeModal}>
                                                close
                                            </button>
                                        </footer>
                                    </section>
                                ) : null}
                            </div>
                        </div>
                    </CardActions>
                </Card>
            </div>
            )

    })
    // paging
    const pagenation = () => {
        let tmp = [] ;
        for(let i = pages.startPage;i<=pages.endPage;i++) {
            tmp.push(i);
        }
        // 페이지 이동
        const changePage =  (p) => {
            setPages( prevState =>{
                return {
                    ...prevState,
                    curpage: p
                }
            })
        }
        // pageList 출력
        let pageMap = tmp.map((i,index)=>(
            <li key={index} className={i===pages.curpage?'page-item active':'page-item'}>
                <span className="page-link" onClick={()=>{changePage(i)}}>{i}</span>
            </li>
        ))
        return(
            <div style={{"margin":"0px auto"}}>
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className={pages.startPage>1?'page-item':'page-item disabled'}>
                            <span className="page-link" onClick={()=>{changePage(pages.startPage-1)}} tabIndex="-1" aria-disabled="true">이전</span>
                        </li>
                        {pageMap}
                        <li className={pages.endPage>=pages.totalpage?'page-item disabled':'page-item'}>
                            <span className="page-link" onClick={()=>{changePage(pages.endPage+1)}}>다음</span>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
    const regionChange = e => {
        setSelected(false)
        setKeyword('')
        setRegion(e.target.innerText)
        setPages(prevState => {
            return{
                curpage: 1
            }
        })
    }
    // nav바
    const nav=
        <div className={"filter-warp"}>
            <span className={"choose-location"}>선택된 지역 : {region}</span>
            <div className={"loaction-search"}>
                <ToggleButton value="check"
                              selected={selected}
                              color={"primary"}
                              onChange={() => {
                                  setSelected(!selected);
                              }}><FilterAltIcon/>&nbsp;지역필터</ToggleButton>
                <input onChange={(event => {setKeyword(event.target.value)})} type={"text"} size={"30"} placeholder={" 키워드 검색"} value={keyword==='all'?'':keyword}/>
                <button  onClick={()=>{search()}} className={"serach-btn"}>
                    <SearchIcon fontSize={"large"} opacity={"0.4"}/>
                </button>
            </div>
            {selected===true?
            <div className={"region-filter"}>
                <ul className={"region-list"}>
                    <li><span onClick={regionChange}>전체</span></li>
                    <li><span onClick={regionChange}>강남구</span></li>
                    <li><span onClick={regionChange}>강동구</span></li>
                    <li><span onClick={regionChange}>강서구</span></li>
                    <li><span onClick={regionChange}>강북구</span></li>
                    <li><span onClick={regionChange}>관악구</span></li>
                    <li><span onClick={regionChange}>광진구</span></li>
                    <li><span onClick={regionChange}>구로구</span></li>
                    <li><span onClick={regionChange}>금천구</span></li>
                    <li><span onClick={regionChange}>노원구</span></li>
                    <li><span onClick={regionChange}>동대문구</span></li>
                    <li><span onClick={regionChange}>도봉구</span></li>
                    <li><span onClick={regionChange}>동작구</span></li>
                    <li><span onClick={regionChange}>마포구</span></li>
                    <li><span onClick={regionChange}>서대문구</span></li>
                    <li><span onClick={regionChange}>성동구</span></li>
                    <li><span onClick={regionChange}>성북구</span></li>
                    <li><span onClick={regionChange}>서초구</span></li>
                    <li><span onClick={regionChange}>송파구</span></li>
                    <li><span onClick={regionChange}>영등포구</span></li>
                    <li><span onClick={regionChange}>용산구</span></li>
                    <li><span onClick={regionChange}>양천구</span></li>
                    <li><span onClick={regionChange}>은평구</span></li>
                    <li><span onClick={regionChange}>종로구</span></li>
                    <li><span onClick={regionChange}>중구</span></li>
                    <li><span onClick={regionChange}>중랑구</span></li>
                </ul>
            </div>:''}
        </div>
    ;
    // return 내용을 하나의 hook으로 만들어보기
    if(type==='1'){
        return(
            <div className={"location-wrap"}>
                <div className={"location-backimg"}></div>
                <div className={"location-textwrap"}>
                    <div className={"location-largeText"}>
                        <span className={"largeText-inner"}>명소</span>
                    </div>
                    <div className={"location-smallText"}>
                        <span className={"smallText-inner"}>놓칠 수 없는 서울의 명소</span>
                    </div>
                </div>
                <div className={"loaction-nav"}>
                    <HomeIcon fontSize={"large"}/> <ArrowForwardIosIcon/>
                    <span>서울 여행</span>
                    <ArrowForwardIosIcon/>
                    <span>명소</span>
                </div>
                {nav}
                <div className={"location-main-wrap"}>
                    <div className={"row"}>
                        {list}
                    </div>
                </div>
                <div className={"pagenation"}>
                    {pagenation()}
                </div>
            </div>
        )
    }else if(type==='2'){
        return(
            <div className={"location-wrap"}>
                <div className={"location-textwrap"}>
                    <div className={"location-largeText"}>
                        <span className={"largeText-inner"}>자연&관광</span>
                    </div>
                    <div className={"location-smallText"}>
                        <span className={"smallText-inner"}>멀리 가지 않아도 도심 속에서 느낄 수 있는 자연의 힐링</span>
                    </div>
                </div>
                <div className={"nature-backimg"}></div>
                <div className={"loaction-nav"}>
                    <HomeIcon fontSize={"large"}/> <ArrowForwardIosIcon/>
                    <span>서울 여행</span>
                    <ArrowForwardIosIcon/>
                    <span>자연&관광</span>
                </div>
                    {nav}
                <div className={"location-main-wrap"}>
                    <div className={"row"}>
                        {list}
                    </div>
                </div>
                <div className={"pagenation"}>
                    {pagenation()}
                </div>
            </div>
        )
    }else{
        return(
            <div className={"location-wrap"}>
                <div className={"location-textwrap"}>
                    <div className={"location-largeText"}>
                        <span className={"largeText-inner"}>호텔</span>
                    </div>
                    <div className={"location-smallText"}>
                        <span className={"smallText-inner"}>놓칠 수 없는 서울의 명소</span>
                    </div>
                </div>
                <div className={"hotel-backimg"}></div>
                <div className={"loaction-nav"}>
                    <HomeIcon fontSize={"large"}/> <ArrowForwardIosIcon/>
                    <span>서울 여행</span>
                    <ArrowForwardIosIcon/>
                    <span>호텔</span>
                </div>
                {nav}
                <div className={"location-main-wrap"}>
                    <div className={"row"}>
                        {list}
                    </div>
                </div>
                <div className={"pagenation"}>
                    {pagenation()}
                </div>
            </div>
        )
    }

}

export default Location