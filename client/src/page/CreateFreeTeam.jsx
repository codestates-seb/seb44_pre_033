import Aside from "../components/common/Aside";
import Nav from "../components/common/LeftNav";
import CreateFreeTeamContent from "../components/main/CreateFreeTeamContent";
import { styled } from 'styled-components';


const CreateFreeTeam = ()=>{
    const current = window.location.href.split('/')[3];
    return(
        <MainPageContainer>
            <MainContainer>
                <Nav current={current}/>
                <ContentContainer>
                    <CreateFreeTeamContent />
                    <Aside />
                </ContentContainer>
            </MainContainer>
        </MainPageContainer>
        
    );
};

export default CreateFreeTeam;

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