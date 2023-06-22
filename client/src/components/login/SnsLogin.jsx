import { styled } from 'styled-components';
import googleIcon from '../../assets/google.png';
import githubIcon from '../../assets/github.png';
import facebookIcon from '../../assets/facebook.png';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 18rem;
  height: 11rem;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10vh;
`;
const DefaultButton = styled.button`
  width: 18rem;
  height: 2.5rem;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 0.95rem;

  img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
`;

const GoogleButton = styled(DefaultButton)`
  border: 1px solid #dddfe2;
  background-color: #ffffff;
`;

const GithubButton = styled(DefaultButton)`
  background-color: #303337;
  div {
    color: white;
  }
  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const FacebookButton = styled(DefaultButton)`
  background-color: #425199;
  div {
    color: white;
  }
  img {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

const SnsLogin = () => {
  return (
    <LoginContainer>
      <GoogleButton>
        <img src={googleIcon} alt="icon"></img>
        <div>Log in with Google</div>
      </GoogleButton>
      <GithubButton>
        <img src={githubIcon} alt="icon"></img>
        <div>Log in with Github</div>
      </GithubButton>
      <FacebookButton>
        <img src={facebookIcon} alt="icon"></img>
        <div>Log in with Facebook</div>
      </FacebookButton>
    </LoginContainer>
  );
};

export default SnsLogin;
