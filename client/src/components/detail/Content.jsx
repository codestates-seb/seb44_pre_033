import styled from 'styled-components';
import VoteBtns from './VoteBtns';
import UserInfo from '../common/UserInfo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Content({ props, contentType, likes }) {
  let [likeCount, setLikeCount] = useState('0')

    let likesCount = likes && likes.filter((e) => e.voteFlag === true).length;
    let disLikesCount = likes && likes.filter((e) => e.voteFlag === false).length;
    let totalLikes = likesCount - disLikesCount;

  useEffect(() => {
    axios(`http://localhost:3000/answersVotes?answerId=${props.id}`)
    .then((res) =>{
      let likesCount = res.data.filter((e) => e.voteFlag === true).length;
      let disLikesCount = res.data.filter((e) => e.voteFlag === false).length;
      let totalLikes = likesCount - disLikesCount;
      setLikeCount(totalLikes)
    }
    );
  }, []);

  const handleDelete = () => {
    alert('정말 삭제하시겠습니까?');
    axios
      .delete(`http://localhost:3000/${contentType}/${props.id}`)
      .then(() => {
        console.log('성공?');
      })
      .catch(() => console.log('실패!'));
  };

  return (
    <Container>
      <VoteBtns likes={totalLikes||likeCount} id={props.id} contentType={contentType} />
      <PostCell>
        <p dangerouslySetInnerHTML={{ __html: props.content }}></p>
        <ActionsAndProfile>
          <Features>
            <div>Share</div>
            <div>
              <a href={`/posts/${props.id}/edit?type=${contentType}`}>Edit</a>
            </div>
            <div>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </Features>
          <UserInfo
            userName={props.name}
            createdDateTime={props.createdDateTime}
          />
        </ActionsAndProfile>
      </PostCell>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid var(--color-gray);
`;

const PostCell = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  display: flex;
  & * {
    color: var(--color-gray);
  }
  div {
    margin-right: 0.5rem;
  }
`;
