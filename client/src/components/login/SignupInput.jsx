import { styled } from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupBox = styled.div`
  width: 18rem;
  height: 32rem;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 8px #dee0e3;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  margin-top: 3vh;

  .name {
    margin-left: -9vw;
    font-weight: 700;
    margin-bottom: -1.5vh;
  }
  .title1 {
    margin-left: -13vw;
    font-weight: 700;
    margin-bottom: -1.5vh;
  }

  .title2 {
    margin-left: -11vw;
    font-weight: 700;
    margin-bottom: -1.5vh;
  }

  input {
    width: 14rem;
    height: 1.5rem;
    margin-bottom: 2vh;
  }

  .content {
    margin-top: 1vh;
    font-size: 0.7rem;
    color: #7d848b;
    margin-left: 2vw;
    line-height: 1.3;
  }

  .erroremail {
    color: red;
    font-size: 0.5rem;
    margin-left: -8vw;
    margin-top: -1.7vw;
  }
  .errorpw {
    color: red;
    font-size: 0.5rem;
    margin-left: -1vw;
    margin-top: -1.7vw;
  }
  .errorname {
    color: red;
    font-size: 0.5rem;
    margin-left: -8vw;
    margin-top: -1.7vw;
  }
`;
const InputContainer = styled.div`
  margin-top: -1vh;
  width: 18rem;
  height: 19rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const BelowContainer = styled.div`
  width: 18rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .policy {
    font-size: 0.7rem;
    color: #7d848b;
    margin-left: 2vw;
    span {
      color: #2c66ba;
    }
    line-height: 1.3;
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
const label = 'Sign up';

const SignupInput = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [pwErrorMessage, setPwlErrorMessage] = useState('');

  const handlePwChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const signup = async () => {
    //2차 검사: 이미 존재하는 가입정보인지
    try {
      const response = await axios.post('https://c1f2-1-240-215-58.ngrok-free.app/signup',{
        name:name,
        email:email,
        password:password,
      });
      console.log(response)
      // const { data } = response;
      // const duplicateUserEmail = data.filter((item) => item.email === email);
      // const duplicateUserName = data.filter((item) => item.name === name);

      // if (duplicateUserEmail.length === 0) {
      //   setEmailErrorMessage('');
      // } else {
      //   setEmailErrorMessage('이미 가입한 이메일입니다');
      // }

      // if (duplicateUserName.length === 0) {
      //   setNameErrorMessage('');
      // } else {
      //   setNameErrorMessage('이미 존재하는 이름입니다');
      // }

      // console.log(emailErrorMessage, nameErrorMessage);

      // 에러메세지 확인 후 , 다른 페이지로 넘어가는 기능이 구현안됨
      /*if (emailErrorMessage === '' && nameErrorMessage === '') {
    navigate('/');
  }*/
    } catch (error) {
      console.log(`${error} 데이터를 가져오는데 문제가 발생했어요`);
    }
  };

  const handleSignupClick = () => {
    let hasError = false;
    // 1차 검사: 이메일 형식과 비밀번호 형식 지킴 여부
    if (!email.includes('@')) {
      setEmailErrorMessage('이메일 형식이 아닙니다');
      hasError = true;
    } else {
      setEmailErrorMessage('');
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}$/.test(password)) {
      setPwlErrorMessage('영문+숫자 조합, 4자 이상 20자 이하로 작성해주세요');
      hasError = true;
    } else {
      setPwlErrorMessage('');
    }
    //console.log(hasError) false
    //console.log(emailErrorMessage, nameErrorMessage); 빈배열

    if (!hasError) {
      signup();

      // 에러가 없으면 메인페이지로 이동
      //서버에 회원가입 데이터 전송
    }
  };

  return (
    <>
      <SignupBox>
        <InputContainer>
          <label htmlFor="name" className="name">
            Display name
          </label>
          <input
            value={name}
            onChange={handleNameChange}
            type="text"
            id="name"
          />
          {nameErrorMessage && (
            <div className="errorname">{nameErrorMessage}</div>
          )}
          <label htmlFor="email" className="title1">
            Email
          </label>
          <input
            value={email}
            onChange={handleEmailChange}
            type="email"
            id="email"
          />
          {emailErrorMessage && (
            <div className="erroremail">{emailErrorMessage}</div>
          )}
          <label htmlFor="password" className="title2">
            Password
          </label>
          <input
            value={password}
            onChange={handlePwChange}
            type="password"
            id="password"
          />
          {pwErrorMessage && <div className="errorpw">{pwErrorMessage}</div>}
          <div className="content">
            Passwords must contain at least eight characters, including at least
            1 letter and 1 number.
          </div>
        </InputContainer>
        <BelowContainer>
          <LoginButton onClick={handleSignupClick}>{label}</LoginButton>
          <div className="policy">
            By clicking “Sign up”, you agree to our{' '}
            <span>terms of service, privacy policy and cookie policy</span>
          </div>
        </BelowContainer>
      </SignupBox>
    </>
  );
};

export default SignupInput;
