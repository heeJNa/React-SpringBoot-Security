import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";
import "./css/Menu.css"
import RestaurantIcon from '@mui/icons-material/Restaurant';
import {Link} from "react-router-dom";
import $ from "jquery"
import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {ToggleButton} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";


const Menu = () => {
    const [page,setPage] = useState(1);
    const [total,setTotal] = useState(0)
    const [pages,setPages] = useState({curpage:1, totalpage:0,count:0,startPage:1,endPage:5})
    const [food,setFood] = useState([]);
    const [type,setType] = useState('이탈리안');
    const [types,setTypes] = useState([]);
    const [region,setRegion]= useState('');
    const [selected, setSelected] = React.useState(false);
    const [keyword,setKeyword] = useState('');

    // type이 변경시 작동 / 처음 실행시 작동
    useEffect(()=>{
        {getFoodList()}
    },[type,pages.curpage])
    const search = () => {
        setPages(prevState => {
            return{
                curpage: 1
            }
        })
        {getFoodList()}
    }
    // foodlist 받아오기
    const getFoodList = () => {
        axios.get("http://localhost:8080/food/menu",{
            params:{
                page:pages.curpage,
                keyword:keyword,
                region:region,
                type:type
            }
        }).then(res=>{
            console.log(res.data)
            setFood(res.data)
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
    // typeList 받아오기
    useEffect(()=>{
        axios.get("http://localhost:8080/food/typelist")
            .then(res=>{
                console.log(res.data)
                setTypes(res.data)
            })
    },[])
    // type 버튼 클릭시 변경
    const typeChange = (type) => {
      setType(type.t);
      setPages(prevState => {
          return{
              curpage: 1
          }
      })
    }
    // pagenation 구현
    const pagenation = () => {
      let tmp = [] ;
      for(let i = pages.startPage;i<=pages.endPage;i++) {
          tmp.push(i);
      }
      // 페이지 이동
      const changePage =  (p) => {
          console.log(p)
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
    // foodlist 반복 출력 구현
    const fmap = food.map((f,index) => (
        <div key={index} className={"col-md-4"}>
            <div className="thumbnail">
                <Link to={"/food/detail/"+f.fno+"/"+1}>
                    <img src={f.poster.substring(0,f.poster.indexOf("^"))} title={f.name} />
                </Link>
                    <div className="caption">
                        <table className={"menuInfoTable"}>
                            <tbody>
                                <tr>
                                    <th width={"25%"}>
                                        식당명
                                    </th>
                                    <td className={"food_house_name"}>
                                        <Link to={"/food/detail/"+f.fno+"/"+1}>{f.name}</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th width={"25%"}>
                                        주소
                                    </th>
                                    <td>
                                        {f.address.substring(0,f.address.lastIndexOf("지번"))}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
    ))
    // typelist 반복 출력 구현
    const typeMap = types.map((t,index)=>(
        <button key={index} className={type===t?'tag-food tag-active':'tag-food'} onClick={()=>typeChange({t})}>{t}</button>
    ))
    // render
    return(
        <Fragment>
            <div className={"menutop-wrap"}>
                <div className={"menu-textwrap"}>
                    <div className={"menu-largeText"}>
                        <span className={"largeText-inner"}>맛집</span>
                    </div>
                    <div className={"menu-smallText"}>
                        <span className={"smallText-inner"}>서울 맛집 탐방하기</span>
                    </div>
                </div>
                <div className={"menu-backimg"}></div>
                <div className={"menu-nav"}>
                    <HomeIcon fontSize={"large"}/> <ArrowForwardIosIcon/>
                    <span>서울 맛집</span>
                    <ArrowForwardIosIcon/>
                    <span>맛집</span>
                </div>
            </div>
            <div className={"menu-wrap"}>
                <div className={"row"}>
                    <h1>Menu List</h1>
                    <div className={"tag-wrap"}>
                        {typeMap}
                    </div>
                </div>
                <div className={"row"}>
                    <h1 className={"menu_title"}><RestaurantIcon fontSize={"large"}/>&nbsp;메뉴별 맛집</h1>
                    <span className={"countInfo"}>총 <em>{pages.count}</em>개의 맛집이 있습니다.</span>
                </div>
                <div className={"row"}>
                    {fmap}
                </div>
                <div>
                    {pagenation()}
                </div>
            </div>
        </Fragment>
    )
}

export default Menu
