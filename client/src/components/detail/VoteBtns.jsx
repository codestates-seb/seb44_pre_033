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

export default function VoteBtns({ votes, id, contentType, onLogin }) {
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [countVotes, setCountVotes] = useState(votes);

  // const userId = localStorage.getItem('userId'); 로그인 시 저장한 유저의 아이디를 들고옵니다.
  // const token = localStorage.getItem('token');

  useEffect(() => {
    setCountVotes(votes);
  }, [votes]);

  // let voteType = '';

  // if (contentType === 'questions') {
  //   voteType = 'questionVotes';
  // } else if (contentType === 'answers') {
  //   voteType = 'answersVotes';
  // }
  // 서버 연결하면 지우기

  return (
    <VoteCell>
      <VoteBtn
        onClick={() =>
          onLogin
            ? axios
                .post(
                  `https://550f-49-163-135-89.ngrok-free.app/${contentType}/${id}/votes`,
                  {
                    voteFlag: true,
                    userId: 1, //userId 로 바뀌어야함
                    [contentType === 'questions' ? 'questionId' : 'answerId']:
                      id, // 지우기
                  },
                  {
                    headers: {
                      // Authorization: localStorage.getItem('token');
                      // 'ngrok-skip-browser-warning': true, //ngrok 홈페이지 연결 막는 속성
                    },
                  }
                )
                .then((res) => {
                  setCountVotes((prevCount) => prevCount + 1);
                })
                .then(() =>
                  axios.patch(`http://localhost:8080/${contentType}/${id}`, {
                    votes: countVotes + 1,
                  })
                )
                .catch((error) => {
                  alert('You can\'t vote twice for same content');
                  console.error(`Fail to post a vote. ${error}`);
                })
            : alert('Please log in to vote')
        }
      >
        <FaCaretUp />
      </VoteBtn>
      <Count>{countVotes}</Count>
      <VoteBtn
        onClick={() =>
          onLogin
            ? axios
                .post(
                  `http://localhost:3000/${voteType}`,
                  {
                    voteFlag: false,
                    userId: 1, //userId 로 바뀌어야함
                    [contentType === 'questions' ? 'questionId' : 'answerId']:
                      id, // 지우기
                  },
                  {
                    headers: {
                      // Authorization: localStorage.getItem('token');
                      // 'ngrok-skip-browser-warning': true, //ngrok 홈페이지 연결 막는 속성
                    },
                  }
                )
                .then((res) => {
                  setCountVotes((prevCount) => prevCount - 1);
                })
                .then(() =>
                  axios.patch(`http://localhost:3000/${contentType}/${id}`, {
                    votes: countVotes - 1,
                  })
                )
                .catch((error) => {
                  alert('You can\'t vote twice for same content'); //409에러 여부에 따라 alert 할 수 있는지 체크
                  console.error(`Fail to post a vote. ${error}`);
                })
            : alert('Please log in to vote')
        }
      >
        <FaCaretDown />
      </VoteBtn>
      <SaveBtn
        onClick={() => {
          setIsSaveClicked(!isSaveClicked);
        }}
        issaveclicked={isSaveClicked ? 1 : 0}
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
