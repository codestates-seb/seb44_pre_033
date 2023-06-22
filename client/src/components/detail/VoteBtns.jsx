import { useState, useEffect } from 'react';
import {
  FaCaretUp,
  FaCaretDown,
  FaRegBookmark,
  FaBookmark,
} from 'react-icons/fa';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import styled from 'styled-components';
import axios from 'axios';

export default function VoteBtns({ likes, id, contentType }) {
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [countLikes, setCountLikes] = useState(likes);
  useEffect(() => {
    setCountLikes(likes);
  }, [likes]);

  let voteType = '';

  if (contentType === 'questions') {
    voteType = 'questionVotes';
  } else if (contentType === 'answers') {
    voteType = 'answersVotes';
  }

  return (
    <VoteCell>
      <VoteBtn
        onClick={() =>
          axios
            .post(`http://localhost:3000/${voteType}`, {
              voteFlag: true,
              userId: 1, //user.id 로 바뀌어야함
              [contentType === 'questions' ? 'questionId' : 'answerId']: id, // 지우기
            })
            .then((res) => {
              setCountLikes((prevCount) => prevCount + 1);
            })
            .then(() =>
              axios.patch(`http://localhost:3000/${contentType}/${id}`, {
                votes: countLikes + 1,
              })
            )
            .catch(() => {
              console.error('Invalid access to likes count update endpoint.');
            })
        }
      >
        <FaCaretUp />
      </VoteBtn>
      <Count>{countLikes}</Count>
      <VoteBtn
        onClick={() =>
          axios
            .post(`http://localhost:3000/${voteType}`, {
              voteFlag: false,
              userId: 1, //user.id 로 바뀌어야함
              [contentType === 'questions' ? 'questionId' : 'answerId']: id, // 지우기
            })
            .then((res) => {
              setCountLikes((prevCount) => prevCount - 1);
            })
            .then(() =>
              axios.patch(`http://localhost:3000/${contentType}/${id}`, {
                votes: countLikes-1,
              })
            )
            .catch(() => {
              console.error('Invalid access to likes count update endpoint.');
            })
        }
      >
        <FaCaretDown />
      </VoteBtn>
      <SaveBtn
        onClick={() => {
          setIsSaveClicked(!isSaveClicked);
        }}
        isSaveClicked={isSaveClicked}
      >
        {isSaveClicked ? <FaBookmark /> : <FaRegBookmark />}
      </SaveBtn>
      <TimeBtn>
        <RxCounterClockwiseClock />
      </TimeBtn>
    </VoteCell>
  );
}
const VoteCell = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;
const VoteBtn = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: 1px var(--color-gray) solid;
  background: transparent;
  border-radius: 50%;
  &:hover {
    background: #fce3cf;
  }
`;

const Count = styled.div`
  text-align: center;
  margin: 1rem 0;
  font-weight: 700;
`;
const SaveBtn = styled.button`
  background-color: transparent;
  width: 2.5rem;
  height: 2rem;
  color: ${(props) =>
    props.isSaveClicked ? 'var(--color-orange)' : 'var(--color-gray)'};
`;

const TimeBtn = styled.button`
  background-color: transparent;
  color: var(--color-gray);
  width: 2.5rem;
  height: 2rem;
  &:hover {
    color: var(--color-blue);
  }
`;
