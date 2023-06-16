import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './page/Detail';
import Ask from './page/Ask';
import Login from './page/Login';
import Logout from './page/Logout';
import Signup from './page/Signup';
import NotFound from './page/NotFound';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={<></>}></Route>
          {/* 상세페이지 */}
          <Route path="/detail" element={<Detail/>}></Route>
          {/* 질문작성페이지 */}
          <Route path="/questions/ask" element={<Ask />}></Route>
          {/* 로그인 페이지 */}
          <Route path="/users/login" element={<Login />}></Route>
          {/* 로그아웃 페이지 */}
          <Route path="/users/logout" element={<Logout />}></Route>
          {/* 회원가입 페이지 */}
          <Route path="/users/signup" element={<Signup />}></Route>
          {/* 404 NotFound */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
