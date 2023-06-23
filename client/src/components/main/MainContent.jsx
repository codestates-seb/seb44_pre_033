import { styled } from 'styled-components';
import ButtonFlex from '../common/ButtonFlexible';
import FilterSection from './FilterSection';
import FilteredContent from './FilteredContent';
import { useNavigate } from 'react-router-dom';

const MainContent = ()=>{

    const navigate = useNavigate();

    const onClickQuestion = ()=>{
        navigate('/questions/ask');
        console.log('되나');
    }
    

    return(
        <MainContentContainer>
            <HeaderContainer>
                <Header>
                    <Title>
                        Top Questions
                    </Title>
                    <ButtonFlex label='Ask Question' color='Blue' onClick={onClickQuestion}/>
                </Header>
                <FilterSection />
            </HeaderContainer>
            <FilteredContent/>
        </MainContentContainer>
    );
};

export default MainContent;

const MainContentContainer = styled.main`
    flex-basis: 50rem;
    flex-grow:1;
    padding:0 1rem 0 0;

`;

const HeaderContainer = styled.main`
    display:flex;
    flex-direction: column;
    border-bottom: 0.05rem solid var(--color-gray);
    padding-left:1rem;
`;

const Header = styled.div`
    display:flex;
    flex-direction: row;
    justify-content:space-between;
`;

const Title = styled.div`
    font-size: 1.8rem;
`;

