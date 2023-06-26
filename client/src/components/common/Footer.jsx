import { styled } from 'styled-components';
import LogoImg from '../../assets/logo-only.svg';
import { Link } from 'react-router-dom';


export default function Footer() {
    return(
        <FooterContainer>
            <Logo path='/' src={LogoImg} alt='stack overflow'/>
            <NavContainer>
                <FooterNavSection>
                    <h5>STACK OVERFLOW</h5>
                    <ul>
                        <li>Questions</li>
                        <li>Help</li>
                    </ul>
                </FooterNavSection>
                <FooterNavSection>
                    <h5>PRODUCTS</h5>
                    <ul>
                        <li>Teams</li>
                        <li>Advertising</li>
                        <li>Collectives</li>
                        <li>Talent</li>
                    </ul>
                </FooterNavSection>
                <FooterNavSection>
                    <h5>COMPANY</h5>
                    <ul>
                        <li>About</li>
                        <li>Press</li>
                        <li>Work Here</li>
                        <li>Legal</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>Contact Us</li>
                        <li>Cookie Setting</li>
                        <li>Cookie Policy</li>
                    </ul>
                </FooterNavSection>
                <FooterNavSection>
                    <h5>STACK EXCHANGE NETWORK</h5>
                    <ul>
                        <li>Technology</li>
                        <li>Culture & Recreation</li>
                        <li>Life & Arts</li>
                        <li>Science</li>
                        <li>Professional</li>
                        <li>Business</li>
                    </ul>
                </FooterNavSection>
                <SnsContainer>
                    <Sns>
                        <div>Blog</div>
                        <div>Facebook</div>
                        <div>Twitter</div>
                        <div>LinkedIn</div>
                        <div>Instagram</div>
                    </Sns>
                    <div>
                        Site design / logo © 2023 Stack Exchange Inc; user contributions licensed under CC BY-SA. rev 2023.6.20.43502
                    </div>
                </SnsContainer>
            </NavContainer>

            
        </FooterContainer>
        
    );
};

const Logo = ({ path, src, alt }) => {
    return (
        <LogoWrap>
          <Link to={path}>
            <LogoImage src={src} alt={alt} />
          </Link>
        </LogoWrap>
      );
};

const LogoWrap = styled.footer`
    display: flex;
    flex-direction: row-reverse;
    width:10rem;
    flex-grow:0;
    padding: 0 1rem;
`;

const LogoImage = styled.img`
    width: 2rem;
`;

const FooterContainer = styled.div`
    background-color: #242729;
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    border: 2px solid black;
    padding:2rem;
`;

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-grow:1;
`;

const FooterNavSection = styled.div`
    color:#BBC0C4;
    h5 {
        margin: 0 0 1rem 0;
        font-size: 1rem;
        font-weight: 700;
        color:#BBC0C4;
    };
    li {
        font-size: 0.8rem;
        margin: 0.8rem 0;
        color:#BBC0C4;
    };
`;

const SnsContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20rem;
    div {
        color:#BBC0C4;
        font-size: 0.4rem;
    }
`;

const Sns = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.4rem;
    div {
        color:#BBC0C4;
    }
`;