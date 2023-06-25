import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import {
  FaCaretUp,
  FaCaretDown,
  FaRegBookmark,
  FaBookmark,
} from 'react-icons/fa';

export default function VoteBtns({ votes, id, contentType }) {
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [countVotes, setCountVotes] = useState(votes);

  useEffect(() => {
    setCountVotes(votes);
  }, [votes]);

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
              setCountVotes((prevCount) => prevCount + 1);
            })
            .then(() =>
              axios.patch(`http://localhost:3000/${contentType}/${id}`, {
                votes: countVotes + 1,
              })
            )
            .catch((error) => {
              console.error(`Fail to post a vote. Error detail: ${error}`);
            })
        }
      >
        <FaCaretUp />
      </VoteBtn>
      <Count>{countVotes}</Count>
      <VoteBtn
        onClick={() =>
          axios
            .post(`http://localhost:3000/${voteType}`, {
              voteFlag: false,
              userId: 1, //user.id 로 바뀌어야함
              [contentType === 'questions' ? 'questionId' : 'answerId']: id, // 지우기
            })
            .then((res) => {
              setCountVotes((prevCount) => prevCount - 1);
            })
            .then(() =>
              axios.patch(`http://localhost:3000/${contentType}/${id}`, {
                votes: countVotes - 1,
              })
            )
            .catch((error) => {
              console.error(`Fail to post a vote. Error detail: ${error}`);
            })
        }
      >
        <FaCaretDown />
      </VoteBtn>
      <SaveBtn
        onClick={() => {
          setIsSaveClicked(!isSaveClicked);
        }}
        issaveclicked={isSaveClicked?1:0}
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
  margin-right: 2rem;
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
    props.issaveclicked ? 'var(--color-orange)' : 'var(--color-gray)'};
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
