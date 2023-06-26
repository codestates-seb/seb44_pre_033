import { styled } from 'styled-components';
import ButtonFlex from '../common/ButtonFlexible';
import FilterSection from './FilterSection';
import FilteredContent from './FilteredContent';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import axios from 'axios';

const MainContent = ()=>{
    const [filter,setFilter]=useState('Newest');
    const [questions, setQuestions]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3000/questions')
        .then((res)=>{
            setQuestions(res.data);
        }
        )
        .catch(() => {
            console.error('데이터를 가져오는 중에 문제가 발생했어요.');
          });
    },[]);

    
    const onChangeFilter = (e)=>{
        setFilter(e.target.value);
    }

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
                <FilterSection questions={questions} onChangeFilter={onChangeFilter} />
            </HeaderContainer>
            <FilteredContent questions={questions} filter={filter} />
        </MainContentContainer>
    );
};

export default MainContent;

const MainContentContainer = styled.main`
    flex-basis: 80rem;
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

