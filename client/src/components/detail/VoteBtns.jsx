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

export default function VoteBtns({ like, id, contentType }) {
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [countLike, setCountLike] = useState(like);
  useEffect(() => {
    setCountLike(like);
  }, [like]);

  return (
    <VoteCell>
      <VoteBtn
        onClick={() =>
          axios
            .patch(`http://localhost:3000/${contentType}/${id}`, {
              like: countLike + 1,
            })
            .then((res) => {
              setCountLike(res.data.like);
            })
            .catch(() => {
              console.error('Invalid access to like count update endpoint.');
            })
        }
      >
        <FaCaretUp />
      </VoteBtn>
      <Count>{countLike}</Count>
      <VoteBtn
        onClick={() =>
          axios
            .patch(`http://localhost:3000/${contentType}/${id}`, {
              like: countLike - 1,
            })
            .then((res) => {
              console.log(res);
              setCountLike(res.data.like);
            })
            .catch(() => {
              console.error('Invalid access to like count update endpoint.');
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
