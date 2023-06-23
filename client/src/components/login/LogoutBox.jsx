import { styled } from 'styled-components';
import { Link } from 'react-router-dom';


const LogoutBoxFrame = styled.div`
  width: 20rem;
  height: 26rem;
  background-color: #ffffff;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 20px #e3e3e5;


`;

const LogoutBox = ({ setOnLogin }) => {
  return (
    <LogoutBoxFrame>
      <img src={} alt="content"></img>
    </LogoutBoxFrame>
  );
};

export default LogoutBox;
