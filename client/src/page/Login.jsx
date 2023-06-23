import SnsLogin from '../components/login/SnsLogin.jsx';
import { styled } from 'styled-components';
import LoginInput from '../components/login/LoginInput.jsx';
import { Link } from 'react-router-dom';

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f4;

  .container {
    margin-top: -22vh;
  }
  .content {
    display: flex;
    flex-direction: row;
    margin-top: 5vh;
    font-size: 0.95 rem;

    .ask {
      margin-right: 0.5vw;
    }

    .signup {
      color: #3f77ce;
    }
  }
`;

//

const Login = ({ setOnLogin }) => {
  return (
    <LoginPageContainer>
      <div className="container">
        <SnsLogin />
        <LoginInput setOnLogin={setOnLogin} className="loginInput" />
      </div>
      <div className="content">
        <div className="ask">Don’t have an account?</div>
        <Link to="/users/signup" className="signup">
          Sign up
        </Link>
      </div>
    </LoginPageContainer>
  );
};

export default Login;
