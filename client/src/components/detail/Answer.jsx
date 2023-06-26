import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Content from './Content';
import ValidatedTextEditor from '../common/ValidatedTextEditor.jsx';

export default function Answer({onLogin}) {
  const params = useParams();

  const [answerList, setAnswerList] = useState([]);
  const [filterTap, setFilterTap] = useState('score');

  const answerFilterHandler = (e) => {
    setFilterTap(e.target.value);
  };

  const answerFilter = [
    {
      id: 1,
      Name: 'Highest score (default)',
      value: 'score',
    },
    {
      id: 2,
      Name: 'Date modified (newest first)',
      value: 'newest',
    },
    {
      id: 3,
      Name: 'Date created (oldest first)',
      value: 'oldest',
    },
  ];

  //답변 데이터를 받아와서 필터링
  useEffect(() => {
    axios
      .get(`http://localhost:3000/answers?questionId=${params.id}`,{
        headers: {
          // 'ngrok-skip-browser-warning': true, //ngrok 홈페이지 연결 막는 속성
        }
      })
      .then((res) => {
        if (filterTap === 'score') {
          const sortedAnswerList = res.data.sort((a, b) => b.votes - a.votes);
          setAnswerList(sortedAnswerList);
        } else if (filterTap === 'newest') {
          const sortedAnswerList = res.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setAnswerList(sortedAnswerList);
        } else if (filterTap === 'oldest') {
          const sortedAnswerList = res.data.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          setAnswerList(sortedAnswerList);
        }
      })
      .catch((error) =>
        console.errer(`Fail to get answers. Error Detail: ${error}`)
      );
  }, [filterTap]);

  return (
    <Container>
      <AnswerHeader>
        <div className="answerCount">{answerList.length} Answers</div>
        <div className="sort">
          <label>Sorted by: </label>
          <select onChange={answerFilterHandler}>
            {answerFilter.map((sortType) => (
              <option key={sortType.id} value={sortType.value}>
                {sortType.Name}
              </option>
            ))}
          </select>
        </div>
      </AnswerHeader>
      {answerList.map((answer) => (
        <li key={answer.id}>
          <Content onLogin={onLogin} contentData={answer} contentType={'answers'} />
        </li>
      ))}
      <ValidatedTextEditor onLogin={onLogin} questionId={params.id}/>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const AnswerHeader = styled.ul`
  display: flex;
  justify-content: space-between;
  .answerCount {
    font-size: 1.2rem;
    font-weight: 700;
  }
  .sort {
    display: flex;
    align-items: center;
  }
  & select {
    padding: 0.5rem;
    margin-left: 0.5rem;
  }
`;