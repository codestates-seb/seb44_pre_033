import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import 에스크우분투 from '../../assets/애스크우분투.png';
import 매쓰오버플로우 from '../../assets/매쓰오버플로우.png';
import 서버폴트 from '../../assets/서버폴트.png';
import 스택앱스 from '../../assets/스택앱.png';
import 스택익스체인지 from '../../assets/스택익스체인지.png';
import 스택오버플로우 from '../../assets/logo-only.svg';
import 슈퍼유저 from '../../assets/슈퍼유저.png';
import ButtonFlex from '../common/ButtonFlexible.jsx';

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

  label {
    font-size: 0.85rem;
  }
`;

const LinkContent = styled.div`
  width: 18rem;
  height: 15rem;
  border-bottom: 1px solid #e3e4e6;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .first {
    margin-top: 1rem;
  }

  img {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 0.3rem;
  }

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .linkname {
    font-size: 1rem;
    color: #0074cc;
  }

  .last {
    margin-bottom: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  .cancel {
    width: 4rem;
    height: 2.2rem;
    font-size: 0.9rem;
    color: #0074cc;
    margin-left: 0.3rem;

    &:hover {
      background-color: #eff8ff;
    }
  }
`;

const BottomContanier = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 16rem;
  height: 10rem;

  .bottomsentence {
    font-size: 0.8rem;
    color: #6a737c;
    width: 16rem;
    height: 3rem;
    line-height: 1.2;
  }
`;

const LogoutBox = ({ setOnLogin }) => {
  const logoutRequestHandler = () => {
    setOnLogin(false);
  };

  return (
    <LogoutBoxFrame>
      <LinkContent>
        <a className="first" href="https://askubuntu.com">
          <img src={에스크우분투} alt="icon"></img>
          <div className="linkname">askubunto.com</div>
        </a>
        <a href="https://mathoverflow.net">
          <img src={매쓰오버플로우} alt="icon"></img>
          <div className="linkname">mathoverflow.net</div>
        </a>
        <a href="https://serverfault.com">
          <img src={서버폴트} alt="icon"></img>
          <div className="linkname">serverfault.com</div>
        </a>
        <a href="https://stackapps.com">
          <img src={스택앱스} alt="icon"></img>
          <div className="linkname">stackapps.com</div>
        </a>
        <a href="https://stackexchange.com">
          <img src={스택익스체인지} alt="icon"></img>
          <div className="linkname">stackexchange.com</div>
        </a>
        <a href="https://stackoverflow.com">
          <img src={스택오버플로우} alt="icon"></img>
          <div className="linkname">stackoverflow.com</div>
        </a>
        <a className="last" href="https://superuser.com">
          <img src={슈퍼유저} alt="icon"></img>
          <div className="linkname">superuser.com</div>
        </a>
      </LinkContent>
      <BottomContanier>
        <div className="checkboxcontent">
          <label>
            <input type="checkbox" name="example" value="1" />
            Log out on all devices
          </label>
        </div>
        <ButtonContainer>
          <ButtonFlex
            onClick={logoutRequestHandler}
            label="Log out"
            length="0"
            color="Blue"
          />
          {/*로그아웃 버튼을 누르면 로그인이 풀린상태가 되고, 토큰을 삭제 */}
          <Link to="/">
            <button className="cancel">Cancel</button>
          </Link>
        </ButtonContainer>
        <div className="bottomsentence">
          If you’re on a shared computer, remember to log out of your Open ID
          provider (Facebook, Google, Stack Exchange, etc.) as well.
        </div>
      </BottomContanier>
    </LogoutBoxFrame>
  );
};

export default LogoutBox;
