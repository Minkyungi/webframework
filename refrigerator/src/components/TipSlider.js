// components/TipSlider.js
import Slider from "react-slick";
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import Tip from './Tip';
import { IoArrowBackCircle } from "react-icons/io5";
import { IoArrowForwardCircle } from "react-icons/io5";
const StyledSlider = styled(Slider)`
    height: 100%;
    width: 100%;
    position: relative;
    .slick-prev::before,
    .slick-next::before {
    opacity: 0;  
    display: none;
    }`; //슬라이드 내부의 div에 커서를 포인터(pointer)로 변경하여 마우스를 올렸을 때 슬라이드 클릭가능

  const Pre = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%); 
    left: 0.1%;
    z-index: 3;
    `;

  const NextTo = styled.div`
    position: absolute;
    top: 50%; 
    transform: translateY(-50%);
    right: 1%;
    z-index: 3;
    `;

const TipSlider =({tips,onClick}) =>{
  const settings = {
    dots: true,
    lazyLoad: "anticipated", //페이지에 띄울때 쯤 미리 로딩됨
    infinite: true, //무한으로 넘어감
    arrows : true, 
    speed: 500, // 500ms 0.5초
    slidesToShow: 4, //한 번에 4개의 이미지 출력
    slidesToScroll: 1, //한 이미지씩 넘어감
    initialSlide: 0 ,//첫번째 슬라이드부터 시작
    draggable :false, //드래그불가
    nextArrow: (
      <NextTo>
        <IoArrowForwardCircle size={40} color="black" />
      </NextTo>
    ),
    prevArrow: (
      <Pre>
        <IoArrowBackCircle  size={40} color="black"/>
      </Pre>
    ),
  };

  return (
    <div className="main-list-container">
      <h2>《오늘의 꿀팁》</h2> {/* 줄바꿈 */}
      <StyledSlider {...settings}>
        {tips.slice().map((tip, index) => (
          <Tip key={index} tip={tip} onClick={() => onClick(tip)}/>
        ))}
      </StyledSlider>
    </div>
  );
}

export default TipSlider;