// ./components/menu.js
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
      <>
        <h1>현재 메뉴 페이지에 위치</h1>
        <Link to="/">홈 페이지로 이동</Link>
      </>
    );
  };
  
  export default Menu;