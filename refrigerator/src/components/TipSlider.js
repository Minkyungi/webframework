import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import Tip from './Tip';
import {AiOutlineLeft} from "react-icons/ai"
import {AiOutlineRight} from "react-icons/ai"

const TipSlider =({tips,onClick}) =>{

  const StyledSlider = styled(Slider)`
    height: 100%;
    width: 100%;
    position: relative;
    .slick-prev::before,
    .slick-next::before {
    opacity: 0;  
    display: none;
    }
    .slick-slide div {
    cursor: pointer; 
    }`; //슬라이드 내부의 div에 커서를 포인터(pointer)로 변경하여 마우스를 올렸을 때 슬라이드 클릭가능

  const Pre = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    left: 1%;
    z-index: 3;
    `;

  const NextTo = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    right: 1%;
    z-index: 3;
    `;
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
        <img src="/assets/next-arrow.png" alt="nextArrow"/>
      </NextTo>
    ),
    prevArrow: (
      <Pre>
        <img src="/assets/prev-arrow.png" alt="prevArrow"/>
      </Pre>
    ),
  };

  return (
    <div className="main-list-container">
      <h2>〈오늘의 꿀팁〉</h2> {/* 줄바꿈 */}
      <StyledSlider {...settings}>
        {tips.slice(8).map((tip, index) => (
          <Tip key={index} tip={tip} onClick={() => onClick(tip)}/>
        ))}
      </StyledSlider>
    </div>
  );
}

export default TipSlider;