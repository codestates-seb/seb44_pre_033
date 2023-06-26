import { styled } from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

const LoginBox = styled.div`
  width: 18rem;
  height: 16rem;
  background-color: white;
  box-shadow: 0 0 8px #dee0e3;
  border-radius: 5px;
  margin-top: 5vh;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;

  .error {
    color: red;
    font-size: 0.5rem;
    margin-left: -8vw;
    margin-top: -0.8vw;
  }

  .title1 {
    margin-left: -13vw;
    margin-top: 1.5vh;
    margin-bottom: -2vh;
    font-weight: 700;
  }

  .title2 {
    margin-left: -11vw;
    margin-bottom: -2vh;
    font-weight: 700;
    margin-top: -1vh;
  }

  input {
    width: 14rem;
    height: 1.5rem;
  }
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16rem;
  height: 2.4rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  background-color: var(--color-blue);
  color: white;
  border: 1px solid var(--color-blue);
  &:hover {
    background-color: #075ec3;
  }
  a {
    color: white;
  }
`;
const label = 'Log in';

export default function LoginInput({ setOnLogin }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePwChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const loginRequestHandler = () => {
    axios
      .post('https://c1f2-1-240-215-58.ngrok-free.app/login', { email:email, password:password })
      .then((response) => {
        // 성공하면 어떤 정보를 받아오나요? 응답데이터 형태(토큰)
        /*
        {
          id:
          token: name, email, password
          }
         */
        // 성공하면 헤더에 기본프사와 사용자이름이 떴으면 좋겠어요
        //로그인 시 토큰을 로컬스토리지에 저장하고, 로그아웃 시 로컬스토리지할때 삭제

        console.log(response);
        setOnLogin(true);
      })
      .catch((error) => {
        console.log(`${error} 로그인에 실패하였습니다`);
        alert('로그인에 실패하였습니다');
      });
  };

  const handleLoginClick = () => {
    if (!email.includes('@')) {
      setErrorMessage('이메일 형식을 지켜주세요');
    } else {
      loginRequestHandler();
    }
  };

  return (
    <LoginBox>
      <label htmlFor="email" className="title1">
        Email
      </label>
      <input
        value={email}
        onChange={handleEmailChange}
        type="email"
        id="email"
      />
      {errorMessage && <div className="error">{errorMessage}</div>}
      <label htmlFor="password" className="title2">
        Password
      </label>
      <input
        value={password}
        onChange={handlePwChange}
        type="password"
        id="password"
      />
      <LoginButton onClick={handleLoginClick}>{label}</LoginButton>
    </LoginBox>
  );
}
