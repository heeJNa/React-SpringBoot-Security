import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import "../seoul/Modal.css"
import Login from "../auth/Login"
import {logout} from "../auth/LoginLogic";
const Header = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const modal = () => {
        modalOpen === true
            ? setModalOpen(false)
            : setModalOpen(true)
    }
    const logoutFunc = () => {
        logout()
    }
    const userNav = () => {
        if (sessionStorage.getItem("isLogin")!=='login'){
            console.log("user no")
            return (
                <Fragment>
                    <li><Link to="/auth/signup">회원가입</Link></li>
                    <li><span onClick={modal} style={{"cursor":"pointer"}}>로그인</span>
                        <div className={modalOpen ? 'openModal modal' : 'modal'}>
                            <section>
                                <main>
                                    <Login/>
                                </main>
                                <footer>
                                    <button className="close" onClick={modal}>
                                        close
                                    </button>
                                </footer>
                            </section>
                        </div>
                    </li>
                </Fragment>
            )
        }else{
            console.log("user yes")
            return(
                <li><span style={{"cursor":"pointer"}} onClick={logoutFunc}>로그아웃</span></li>
            )
        }
    }
    return(
        <div className="wrapper row1">
            <header id="header" className="clear">
                <div id="logo" className="fl_left">
                    <h1><Link to="/">Seoul Tour</Link></h1>
                </div>
                <nav id="mainav" className="fl_right">
                    <ul className="clear">
                        <li className="active"><Link to="/">Home</Link></li>
                        <li><Link to="/food/menu">서울 맛집</Link></li>
                        <li><Link className="drop" to="#">서울 여행</Link>
                            <ul>
                                <li><Link to="/seoul/location/1/all">명소</Link></li>
                                <li><Link to="/seoul/location/2/all">자연/관광</Link></li>
                                <li><Link to="/seoul/location/3/all">호텔</Link></li>
                            </ul>
                        </li>
                        {/*<li><Link to="/community/board">자유게시판</Link></li>*/}
                        {userNav()}
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header