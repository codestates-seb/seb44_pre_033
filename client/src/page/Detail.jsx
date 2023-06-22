import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';
import Answer from '../components/detail/Answer';
import Content from '../components/detail/Content';
import Title from '../components/detail/Title';
import Aside from '../components/common/Aside';

export default function Detail() {
  const [questionsData, setQuestionData] = useState([]);
  const [answersData, setAnswersData] = useState([]);
  const [votesData, setVotesData] = useState([])
  const params = useParams();
  useEffect(() => {
    axios.all([
      axios.get(`http://localhost:3000/questions/${params.id}`),
      axios.get(`http://localhost:3000/questionVotes?questionId=${params.id}`)
    ])
      .then(axios.spread((questionRes, votesRes) => {
        setQuestionData(questionRes.data);
        setVotesData(votesRes.data);
      }))
      .catch(() => {
        console.error('데이터를 가져오는 중에 문제가 발생했어요.');
      });
  }, []);
  
  return (
    <Container>
      <Title questionInfo={questionsData} />
      <ContentAndAside>
        <div className='contentAndAnswer'>
          <Content props={questionsData} likes={votesData} contentType={'questions'} />
          <Answer/>
        </div>
        <Aside />
      </ContentAndAside>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
const ContentAndAside = styled.div`
display: flex;
.contentAndAnswer{
  margin-right: 2rem;
}
@media (max-width: 980px) {
    flex-direction: column;
    aside{
      width:100%;
      margin-top: 2rem;
    }
    .contentAndAnswer{
      margin-right: 0;
    }
  }
`