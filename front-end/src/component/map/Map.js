/*global kakao */
import React, { useEffect } from "react";

const Map = (props) => {
        const script=document.createElement("script")
        script.async=true;
        script.src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=cf294808f0d9b3189496901cb031c3bc&libraries=services&autoload=false"
        document.head.appendChild(script)
        script.onload=()=>{
            kakao.maps.load(()=>{
                let container = document.getElementById("map");
                let options = {
                    center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
                    level: 3,
                };
                console.log(props.addr.mapAddr)
                let map = new kakao.maps.Map(container, options);
                //위도, 경도로 변환 및 마커표시
                let geocoder = new kakao.maps.services.Geocoder();
                geocoder.addressSearch(props.addr.mapAddr, function (result, status) {

                    if (status === kakao.maps.services.Status.OK) {
                        let imageSrc = 'https://cdn0.iconfinder.com/data/icons/city-elements-filledoutline-1/64/cafe-food_and_restaurant-commerce_and_shopping-architecture_and_city-coffee_shop-store-buildings-1024.png', // 마커이미지의 주소입니다
                            imageSize = new kakao.maps.Size(28, 33), // 마커이미지의 크기입니다
                            imageOption = {offset: new kakao.maps.Point(20, 20)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

                        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                            markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x); // 마커가 표시될 위치입니다

                        let marker = new kakao.maps.Marker({
                            map: map,
                            position: markerPosition,
                            image:markerImage
                        });
                        let infowindow = new kakao.maps.InfoWindow({
                            content: '<div style="width:150px;text-align:center;padding:6px 0;color:black;border: none;border: #3B5998 5px solid;font-size: 18px;font-weight: 600">'+
                                '<span>'+props.data.name+'</span>'+
                                '</div>'
                        });
                        infowindow.open(map, marker);

                        map.setCenter(markerPosition);
                    }
                });
            })
        }
    return(
        <div id="map" style={{"width": "100%", "height": "400px"}}></div>
    )
}
export default Map
