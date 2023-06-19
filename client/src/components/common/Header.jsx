import { styled } from 'styled-components';
import LogoImg from '../../assets/logo-stackoverflow.svg';
import { Link } from 'react-router-dom'
import ButtonFlex from './ButtonFlexible';


const Header = ()=>{
    return(
        <HeaderContainer>
            <Logo path='/' src={LogoImg} alt='stack overflow'/>
            <ButtonContainer>
                <LinkBtn>
                    <ButtonFlex label='Log in' length='0' color='gray'/>
                </LinkBtn>
                <LinkBtn>
                    <ButtonFlex label='Sign up' length='0' color='Blue'/>
                </LinkBtn>
            </ButtonContainer>
        </HeaderContainer>
    );
};

export default Header;


const Logo = ({ path, src, alt }) => {
    return (
        <LogoWrap>
          <Link to={path}>
            <LogoImage src={src} alt={alt} />
          </Link>
        </LogoWrap>
      );
};
    
const LogoWrap = styled.div`
    margin:0.2rem;
`;

const LogoImage = styled.img`
    width: 10rem;
`;


const HeaderContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    border-style:solid;
    border-top-color: var(--color-orange);
    border-top-width: 0.3rem;
    border-bottom-color: #d6d9dc;
    border-bottom-width:0.05rem;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
const LinkBtn = styled.div`
    margin: 0.4rem 0.5rem;
`;