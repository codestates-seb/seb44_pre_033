import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Answer from '../components/detail/Answer';
import Content from '../components/detail/Content';
import Title from '../components/detail/Title';
import Aside from '../components/common/Aside';
import LeftNav from '../components/common/LeftNav';

export default function Detail({onLogin}) {
  const [questionsData, setQuestionData] = useState([]);
  const [questionTotalVotes, setQuestionTotalVotes] = useState(0);
  
  const params = useParams();

  // 질문 제목, 내용, 투표 데이터를 받아옵니다.
  useEffect(() => {
    axios
      .all([
        axios(`http://localhost:3000/questions/${params.id}`),
        axios(`http://localhost:3000/questionVotes?questionId=${params.id}`),
      ])
      .then(
        axios.spread((questionRes, votesRes) => {
          setQuestionData(questionRes.data);
          // 질문 좋아요 카운팅
          const questionLikes = votesRes.data.filter(
            (e) => e.voteFlag === true
          ).length;
          const questionDisLikes = votesRes.data.filter(
            (e) => e.voteFlag === false
          ).length;
          const questionTotalVotes = questionLikes - questionDisLikes;
          setQuestionTotalVotes(questionTotalVotes);
        })
      )
      .catch((error) => {
        console.error(`Fail to get questions data. ${error}`);
      });
  }, []);

  return (
    <Continer>
      <LeftNav current={'questionscontent'} />
      <DetailSection>
        <Title
          questionTitle={questionsData.title}
          createdAt={questionsData.createdAt}
          modifiedAt={questionsData.modifiedAt}
          onLogin={onLogin}
        />
        <div className="withAside">
          <div className="questionAndAnswer">
            <Content
              contentData={questionsData}
              questionTotalVotes={questionTotalVotes}
              contentType="questions"
              onLogin={onLogin}
            />
            <Answer onLogin={onLogin} />
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
  .questionAndAnswer {
    margin-right: 1rem;
    flex-grow: 1;
    max-width: 1280px;
  }
  aside {
    flex-grow: 1;
  }

  .withAside {
    display: flex;
    @media (max-width: 980px) {
      flex-direction: column;
      aside {
        width: 100%;
        margin-top: 2rem;
      }
      .questionAndAnswer {
        margin-right: 0;
      }
      .withAside {
        margin-right: 0;
      }
    }
  }
`;
