import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import VoteBtns from './VoteBtns';
import UserInfo from '../common/UserInfo';
import Modal from './Modal';

export default function Content({
  contentData,
  contentType,
  questionTotalVotes,
}) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [answerTotalVotes, setAnswerTotalVotes] = useState(0);

  // 답변 좋아요 카운팅
  useEffect(() => {
    axios(`http://localhost:3000/answersVotes?answerId=${contentData.id}`)
    .then(
      (res) => {
        const answerLikes = res.data.filter((e) => e.voteFlag === true).length;
        const answerDisLikes = res.data.filter(
          (e) => e.voteFlag === false
        ).length;
        const answerTotalVotes = answerLikes - answerDisLikes;
        setAnswerTotalVotes(answerTotalVotes);
      }
    )
    .catch((error)=>{
      console.error(`Fail to get answers votes data. Error Detail: ${error}`);
    })
  }, []);

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirm = () => {
    axios
      .delete(`http://localhost:3000/${contentType}/${contentData.id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(`Fail to delete. Error Detail: ${error}`);
      });
      setDeleteModalOpen(false);
  };

  const handleCancel = () => {
    setDeleteModalOpen(false);
  };

  return (
    <Container>
      <VoteBtns
        votes={questionTotalVotes || answerTotalVotes}
        id={contentData.id}
        contentType={contentType}
      />
      <PostCell>
        {/* 사용자가 에디터에 쓴 내용 html 형식으로 내보내기 */}
        <article dangerouslySetInnerHTML={{ __html: contentData.content }}></article>
        <ActionsAndProfile>
          <Features>
            <a href={`/posts/${contentData.id}/edit?type=${contentType}`}>
              Edit
            </a>
            <button onClick={handleDelete}>Delete</button>
          </Features>
          {contentType === 'answers' && contentData.modifiedAt ? (
            <div>edited {contentData.modifiedAt}</div>
          ) : null}
          <UserInfo
            userName={contentData.name}
            createdAt={contentData.createdAt}
          />
        </ActionsAndProfile>
      </PostCell>
      {isDeleteModalOpen && (
        <Modal
          meassage={'Are you sure to delete?'}
          confirmFunction={handleConfirm}
          closeFunction={handleCancel}
        />
      )}
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid var(--color-gray);
`;

const PostCell = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  //전역 스타일 리셋 설정으로 Content컴포넌트 개별 스타일링 설정
  ul {
    li {
      list-style: initial;
      margin-left: 1rem;
    }
  }
  ol {
    li {
      list-style: decimal;
      margin-left: 1rem;
    }
  }
`;

const ActionsAndProfile = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Features = styled.div`
  a {
    margin-right: 1rem;
  }
  & * {
    color: var(--color-gray);
    &:hover{
      color:var(--color-orange);
    }
  }
`;
