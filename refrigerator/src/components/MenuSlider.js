// components/MenuSlider.js
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import Recipe from './Recipe';  // Recipe 컴포넌트를 불러옴
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
    }`;

  const Pre = styled.div`
    position: absolute;
    top: 50%; /* Center vertically */
    transform: translateY(-50%); 
    left: 0.1%;
    z-index: 3;
    `;

  const NextTo = styled.div`
    position: absolute;
    top: 50%; /* Center vertically */
    transform: translateY(-50%); 
    right: 1%;
    z-index: 3;
    `;
const MenuSlider =({recipes,onClick}) =>{

  const settings = {
    dots: true,
    infinite: true, //무한으로 넘어감
    arrows : true, 
    speed: 500, // 500ms 0.5초
    slidesToShow: 4, //한 번에 4개의 이미지 출력
    slidesToScroll: 1, //한 이미지씩 넘어감
    initialSlide: 0 ,//첫번째 슬라이드부터 시작
    draggable :false, //드래그불가
    nextArrow: (
      <NextTo>
        <IoArrowForwardCircle size={40} color="black"/>
      </NextTo>
    ),
    prevArrow: (
      <Pre>
       <IoArrowBackCircle size={40} color="black"/>
      </Pre>
    ),
  };

  return (
    <div className="main-list-container">
      <div className="diet-list">
      <h2>《오늘의 식단》</h2>
      <StyledSlider {...settings}>
      {recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} onClick={() => onClick(recipe)}/>
        ))}
      </StyledSlider>
      </div>
      <br />
    </div>
  );
}

export default MenuSlider;