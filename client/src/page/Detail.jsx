import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';
import Answer from '../components/detail/Answer';
import Content from '../components/detail/Content';
import Title from '../components/detail/Title';

export default function Detail() {
  const params = useParams();
  const [questionsData, setQuestionData] = useState([]);
  const [answersData, setAnswersData] = useState([]);

  useEffect(() => {
    axios(`http://localhost:3000/questions/${params.id}`)
      .then((res) => setQuestionData(res.data))
      .catch(() => {
        console.error('질문을 가져오는 중에 문제가 발생했어요.');
      });
    axios(`http://localhost:3000/answers?questionId=${params.id}`)
      .then((res) => setAnswersData(res.data))
      .catch(() => {
        console.error('댓글을 가져오는 중에 문제가 발생했어요.');
      });
  }, []);

  return (
    <Container>
      <Title questionInfo={questionsData} />
      <Content props={questionsData} contentType={'questions'}/>
      <Answer answerInfo={answersData} />
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
