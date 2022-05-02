import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import React, {useEffect, Fragment, useState} from "react";
import Header from "./component/main/Header"
import Home from "./component/main/Home"
import Menu from "./component/food/Menu"
import Footer from "./component/main/Footer";
import FoodDetail from "./component/food/FoodDetail"
import FoodCateDetail from "./component/food/FoodCateDetail"
import Location from "./component/seoul/Location"
import Detail from "./component/seoul/Detail"
import Signup from "./component/auth/Signup"
import Login from "./component/auth/Login"
import {onSilentRefresh} from "./component/auth/LoginLogic";
const App = () => {
  useEffect(()=>{
    console.log('useEffect')
    if (sessionStorage.getItem("isLogin")==='login'){
      onSilentRefresh();
    }
  })
  return (
    <Router>
      <Fragment>
        <Header/>
          <div className={"container-fluid"} style={{"padding":"0px","overflowY": "auto"}}>
            <Routes>
              <Route path={"/"} element={<Home/>}/>
              <Route path={"/food/menu"} element={<Menu/>} />
              <Route path={"/food/detail/:fno/:type"} element={<FoodDetail/>}/>
              <Route path={"/food/cateDetail/:cno"} element={<FoodCateDetail/>}/>
              <Route path={"/seoul/location/:type/:homeKeyword"} element={<Location/>}/>
              <Route path={"/seoul/detail/:no/:type"} element={<Detail/>}/>
              <Route path={"/auth/signup"} element={<Signup/>}/>
              <Route path={"/auth/login"} element={<Login/>}/>
            </Routes>
          </div>
        <Footer/>
      </Fragment>
    </Router>
  );
}

export default App;
