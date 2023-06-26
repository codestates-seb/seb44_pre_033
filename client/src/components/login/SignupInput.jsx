import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [pwErrorMessage, setPwlErrorMessage] = useState('');
  const [signupUserinfo, setSignupUserinfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (signupUserinfo) {
      navigate('/users/login');
    }
  }, [signupUserinfo]);

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
  // 가입형식만 지키면 로그인페이지로 이동
  const postSignupData = () => {
    return axios
      .get('http://localhost:3000/user')
      .then((res) => {
        const { data } = res;
        setSignupUserinfo(true);
      }) //
      .catch((err) => {
        console.log(err, '이미 가입이 되어있는 이메일입니다');
        alert('이미 가입이 되어있는 이메일입니다');
      });
  };

  const handleSignupClick = () => {
    let hasError = false;
    //클라이언트 검사: 이메일 형식과 비밀번호 형식 지킴 여부
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

    if (!hasError) {
      postSignupData();
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
