import SnsSignup from '../components/login/SnsSignup.jsx';
import { styled } from 'styled-components';
import SignupInput from '../components/login/SignupInput.jsx';
import { Link } from 'react-router-dom';
import LeftContent from '../components/login/LeftContent.jsx';

const SignupPageContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f4;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .account {
    margin-top: 3vh;
  }
  .Login {
    color: #3f77ce;
  }
`;
const SnsSignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: -5vw;
`;

const Signup = () => {
  return (
    <SignupPageContainer>
      <LeftContent />
      <SnsSignupContainer>
        <SnsSignup />
        <SignupInput />
        <div className="account">
          Already have an account?{' '}
          <Link to="/users/login" className="Login">
            Log in
          </Link>
        </div>
      </SnsSignupContainer>
    </SignupPageContainer>
  );
};

export default Signup;
