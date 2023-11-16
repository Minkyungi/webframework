// ./components/home.js
import { Link } from 'react-router-dom';
import Header from './Header';

const Home = () => {
  return (
    <>
      <Header showFavoritesButton={false} />
      <h1>현재 홈 페이지에 위치</h1>
      <Link to="/menu">메뉴 페이지로 이동</Link>
      <p></p>
      <Link to="/login">로그인 페이지로 이동</Link>
    </>
  );
};

export default Home;