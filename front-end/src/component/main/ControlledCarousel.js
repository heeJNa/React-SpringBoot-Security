import {Carousel} from "react-bootstrap";
import {useState, useEffect, Fragment} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [category,setCategory] = useState([])
    const [ckBoolean,setCkBoolean] = useState(false)

    useEffect(()=>{
        console.log("hi")
        axios.get("http://localhost:8080/food/category")
            .then(res=>{
                console.log(res.data)
                setCategory(res.data)
                setCkBoolean(true)
            })
    },[])

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const carousel_img = (index) =>{
        return(
            <Fragment>
                <Link to={"food/cateDetail/"+category[index].cno}>
                    <img className={"carousel-img"} src={category[index].poster} alt={category[index].title}/>
                    <div className={"carousel-name"}>
                        <span>
                            {category[index].title}
                        </span>
                        <p>
                            {category[index].subject}
                        </p>
                    </div>
                </Link>
            </Fragment>
        )
    }

    if(ckBoolean==true){
        return(
            <Fragment>
                <div className={"carousel-item-wrap"}>
                    <div className={"carousel-title-wrap"}>
                        <h1 className={"main-carousel-title"}>믿고보는 맛집 리스트</h1>
                    </div>
                    <Carousel variant={"dark"} >
                        <Carousel.Item>
                            <div className={"carousel-warp"}>
                                <div className={"row"}>
                                    <div className={"col-md-4"}>
                                        {carousel_img(0)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(1)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(2)}
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-md-4"}>
                                        {carousel_img(3)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(4)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(5)}
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className={"carousel-warp"}>
                                <div className={"row"}>
                                    <div className={"col-md-4"}>
                                        {carousel_img(6)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(7)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(8)}
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-md-4"}>
                                        {carousel_img(9)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(10)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(11)}
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className={"carousel-item-wrap"}>
                    <div className={"carousel-title-wrap"}>
                        <h1 className={"main-carousel-title"}>지역별 맛집 리스트</h1>
                    </div>
                    <div>
                        <div className={"carousel-warp"}>
                            <div className={"row"}>
                                <div className={"col-md-4"}>
                                    {carousel_img(12)}
                                </div>
                                <div className={"col-md-4"}>
                                    {carousel_img(13)}
                                </div>
                                <div className={"col-md-4"}>
                                    {carousel_img(14)}
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-md-4"}>
                                    {carousel_img(15)}
                                </div>
                                <div className={"col-md-4"}>
                                    {carousel_img(16)}
                                </div>
                                <div className={"col-md-4"}>
                                    {carousel_img(17)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"carousel-item-wrap"}>
                    <div className={"carousel-title-wrap"}>
                        <h1 className={"main-carousel-title"}>메뉴별 맛집 리스트</h1>
                    </div>
                    <Carousel variant={"dark"} >
                        <Carousel.Item>
                            <div className={"carousel-warp"}>
                                <div className={"row"}>
                                    <div className={"col-md-4"}>
                                        {carousel_img(18)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(19)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(20)}
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-md-4"}>
                                        {carousel_img(21)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(22)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(23)}
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className={"carousel-warp"}>
                                <div className={"row"}>
                                    <div className={"col-md-4"}>
                                        {carousel_img(24)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(25)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(26)}
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-md-4"}>
                                        {carousel_img(27)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(28)}
                                    </div>
                                    <div className={"col-md-4"}>
                                        {carousel_img(29)}
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </Fragment>
        );
    }
}

export default ControlledCarousel