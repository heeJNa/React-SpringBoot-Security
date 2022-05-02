import axios from "axios";
import React from "react";
import App from '../../App'
import app from "../../App";
import {getCookie, setCookie} from "../util/Cookie";
const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

export const onLogin = (email, password) => {

    axios.post("http://localhost:8080/user/login",{
        email:email,
        password:password
    })
        .then(res =>{
            onLoginSuccess(res)
            console.log("로그인 성공")
            alert("로그인 성공");
            document.location.href="/"
        }).catch(error=>{
            if(error.response){
                alert(error.response.data)
            }
            console.log("로그인 실패")
        })
}

export const onSilentRefresh = () => {
    console.log("refresh")
    axios.post("http://localhost:8080/user/refresh",
    )
        .then(res=>{
            onLoginSuccess(res)
        })
        .catch(error => {
            if(error.response){
                alert(error.response.data)
            }
        });
}

const onLoginSuccess = (response) => {
    console.log(response)
    // accessToken 만료하기 1분 전에 로그인 연장
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
    sessionStorage.setItem("isLogin","login")
}

export const logout = () =>{
    axios.post("http://localhost:8080/user/logout",)
        .then(res=>{
            sessionStorage.removeItem("isLogin")
            console.log("로그아웃 성공")
            document.location.href="/"
        })
        .catch(error => {
            if(error.response){
                alert(error.response.data)
            }
        });
}
