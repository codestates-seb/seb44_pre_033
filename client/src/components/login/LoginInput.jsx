import styled from 'styled-components';
import { useState } from 'react';

const LoginBox = styled.div`
  width: 18rem;
  height: 16rem;
  background-color: white;
  box-shadow: 0 0 8px #dee0e3;
  border-radius: 5px;
  margin-top: 2vh;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;

  .error {
    color: red;
    font-size:0.5rem;
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

export default function LoginInput() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleLoginClick = () => {
    if (!email.includes('@')) {
      setErrorMessage('이메일 형식을 지켜주세요');
    }
  };
  return (
    <LoginBox>
      <label htmlFor="email" className="title1">
        Email
      </label>
      <input onChange={handleEmailChange} type="email" id="email" />
      {errorMessage && <div className="error">{errorMessage}</div>}
      <label htmlFor="password" className="title2">
        Password
      </label>
      <input type="password" id="password" />
      <LoginButton onClick={handleLoginClick}>{label}</LoginButton>
    </LoginBox>
  );
}
