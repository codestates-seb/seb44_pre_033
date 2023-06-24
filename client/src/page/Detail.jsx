import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Answer from '../components/detail/Answer';
import Content from '../components/detail/Content';
import Title from '../components/detail/Title';
import Aside from '../components/common/Aside';
import LeftNav from '../components/common/LeftNav';

export default function Detail() {
  const [questionsData, setQuestionData] = useState([]);
  const [votesData, setVotesData] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios
      .all([
        axios.get(`http://localhost:3000/questions/${params.id}`),
        axios.get(
          `http://localhost:3000/questionVotes?questionId=${params.id}`
        ),
      ])
      .then(
        axios.spread((questionRes, votesRes) => {
          setQuestionData(questionRes.data);
          setVotesData(votesRes.data);
        })
      )
      .catch(() => {
        console.error('An error occurred while retrieving the data.');
      });
  }, []);

  return (
    <Continer>
      <LeftNav />
      <DetailSection>
        <Title
          title={questionsData.title}
          createdAt={questionsData.createdAt}
          modifiedAt={questionsData.modifiedAt}
        />
        <div className="withAside">
          <div className="contentAndAnswer">
            <Content
              props={questionsData}
              likes={votesData}
              contentType={'questions'}
            />
            <Answer />
          </div>
          <Aside />
        </div>
      </DetailSection>
    </Continer>
  );
}

const Continer = styled.div`
  display: flex;
`;

const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  .contentAndAnswer {
    margin-right: 2rem;
    flex-basis: 50rem;
    flex-grow: 1;
    flex-shrink: 0;
  }
  .withAside {
    display: flex;
    @media (max-width: 980px) {
      flex-direction: column;
      aside {
        width: 100%;
        margin-top: 2rem;
      }
      .contentAndAnswer {
        margin-right: 0;
      }
      .withAside {
        margin-right: 0;
      }
    }
  }
`;
