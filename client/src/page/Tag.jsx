import Aside from "../components/common/Aside";
import Nav from "../components/common/LeftNav";
import TagContent from "../components/main/TagContent";
import { styled } from 'styled-components';


const Tag = ()=>{
    const current = window.location.href.split('/')[3];
    return(
        <MainPageContainer>
            <MainContainer>
                <Nav current={current}/>
                <ContentContainer>
                    <TagContent />
                    <Aside />
                </ContentContainer>
            </MainContainer>
        </MainPageContainer>
        
    );
};

export default Tag;

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