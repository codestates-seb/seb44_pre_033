<<<<<<< HEAD
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

=======
>>>>>>> b7aa5adcc0bdf35d88f11a6605c7430bce843949
function App() {
  return (
    <>
<<<<<<< HEAD
      <BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/product/*" element={<Product />}></Route>
					{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
=======
      <div>우왕 초기세팅</div>
>>>>>>> b7aa5adcc0bdf35d88f11a6605c7430bce843949
    </>
  );
}

export default App;
