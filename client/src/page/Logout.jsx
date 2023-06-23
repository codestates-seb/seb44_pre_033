import { styled } from 'styled-components';
import LogoutBox from '../components/login/LogoutBox.jsx';

const LogoutPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f4;

  .content {
    margin-top: -5rem;
    font-size: 1.5rem;
    width: 32rem;
    height: 4.5rem;
    text-align: center;
  }
`;

const Logout = ({ setOnLogin }) => {
  return (
    <LogoutPageContainer>
      <div className="content">
        Clicking “Log out” will log you out of the following domains on this
        device:
      </div>
      <LogoutBox setOnLogin={setOnLogin}></LogoutBox>
    </LogoutPageContainer>
  );
};

export default Logout;
