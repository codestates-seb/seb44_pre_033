import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './page/Main';
import Detail from './page/Detail';
import Edit from './page/Edit';
import Ask from './page/Ask';
import Login from './page/Login';
import Logout from './page/Logout';
import Signup from './page/Signup';
import NotFound from './page/NotFound';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import HeaderLogin from './components/common/HeaderLogin.jsx';
import { useState } from 'react';
import Users from './page/Users';
import Tag from './page/Tag';
import Companies from './page/Companies';
import ExploreCollectives from './page/ExploreCollectives';
import CreateFreeTeam from './page/CreateFreeTeam';
import Questions from './page/Questions';

function App() {
  const [onLogin, setOnLogin] = useState(true); //일단 로그인 된 헤더를 내보냄, false를 넣으면 로그아웃 헤더로 변경됨
  const [userinfo, setUserinfo] = useState('유저이름');

  return (
    <>
      <BrowserRouter>
        {onLogin ? <HeaderLogin userinfo={userinfo} /> : <Header />}
        <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={<Main />}></Route>
          <Route path="/questionscontent" element={<Questions />}></Route>
          <Route path='/tagcontent' element={<Tag />}></Route>
          <Route path='/usercontent' element={<Users />}></Route>
          <Route path='/companiescontent' element={<Companies />}></Route>
          <Route path='/explorecollectives' element={<ExploreCollectives />}></Route>
          <Route path='/createfreeteamcontent' element={<CreateFreeTeam />}></Route>
          {/* 상세페이지 */}
          <Route
            path="/detail/:id"
            element={<Detail onLogin={onLogin} />}
          ></Route>
          {/* 수정 페이지 */}
          <Route
            path="/posts/:id/edit"
            element={<Edit onLogin={onLogin} />}
          ></Route>
          {/* 질문작성페이지 */}
          <Route
            path="/questions/ask"
            element={<Ask onLogin={onLogin} />}
          ></Route>
          {/* 로그인 페이지 */}
          <Route
            path="/users/login"
            element={
              <Login userinfo={userinfo} onLogin={onLogin} setOnLogin={setOnLogin} setUserinfo={setUserinfo} />
            }
          ></Route>
          {/* 로그아웃 페이지 */}
          <Route
            path="/users/logout"
            element={
              <Logout setOnLogin={setOnLogin} setUserinfo={setUserinfo} />
            }
          ></Route>
          {/* 회원가입 페이지 */}
          <Route path="/users/signup" element={<Signup />}></Route>
          {/* 404 NotFound */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
