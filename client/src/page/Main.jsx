import Aside from "../components/common/Aside";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Nav from "../components/common/LeftNav";
import MainContent from "../components/main/MainContent";
import { styled } from 'styled-components';


const Main = ()=>{
    return(
        <MainPageContainer>
            <Header />
            <MainContainer>
                <Nav />
                <ContentContainer>
                    <MainContent />
                    <Aside />
                </ContentContainer>
            </MainContainer>
            <Footer />
        </MainPageContainer>
        
        
    );
};

export default Main;

const MainPageContainer = styled.div`
    display:flex;
    flex-direction: column;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow:1;
`;

const ContentContainer = styled.div`
    padding: 1.4rem;
    padding-left:0;
    display: flex;
    flex-direction: row;
    flex-grow:1;
`;