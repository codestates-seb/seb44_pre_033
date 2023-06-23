import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';

import styled from 'styled-components';
import axios from 'axios';

import TextEditor from '../common/TextEditor.jsx';
import ButtonFixed from '../common/ButtonFixed';
import Content from './Content';

export default function Answer() {
  const [body, setBody] = useState('');
  const [isBodyValid, setIsBodyValid] = useState(true);
  const [isbodyError, setIsBodyError] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [answerList, setAnswerList] = useState([]);

  let bodyLength = body.replace(/<[^>]*>/g, '').length;
  const params = useParams();
  const newestData = answerList.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  ); // 최신순

  const handleBodyChange = (value) => {
    setBody(value);
  };
  const handleSubmit = () => {
    if (isBodyValid) {
      setModalOpen(true);
      setIsBodyError(true);
    } else {
      setIsBodyError(false);
    }
  };

  const handleConfirm = () => {
    if (isBodyValid) {
      axios
        .post('http://localhost:3000/answers', {
          questionId: Number(params.id),
          userId: 1, //user.id
          content: body,
          createAt: new Date().toLocaleString(), // 지우기
          name: 'kimgcoding', // 지우기
        })
        .then((res) => {
          window.location.reload();
        })
        .catch(() => {
          console.error('Fail to post');
        });
    } else {
      console.log('길이를 수정해주세요');
    }
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
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
  useEffect(() => {
    axios
      .get(`http://localhost:3000/answers?questionId=${params.id}`)
      .then((res) => setAnswerList(res.data))
      .catch((error) => console.errer());
  }, []);

  useEffect(() => {
    if (bodyLength < 100) {
      setIsBodyValid(false);
    } else if (bodyLength >= 100) {
      setIsBodyValid(true);
      setIsBodyError(true);
    }
  }, [body]);
  return (
    <Container>
      <NumAndSort>
        <div className="answersNum">{answerList.length} Answers</div>
        <div className="sort">
          <label>Sorted by: </label>
          <select onChange={answerFilterHandler}>
            {answerFilter.map((el) => (
              <option key={el.id} value={el.value}>
                {el.Name}
              </option>
            ))}
          </select>
        </div>
      </NumAndSort>
      {answerList.map((answer) => (
        <li key={answer.id}>
          <Content props={answer} contentType={'answers'} />
        </li>
      ))}
      <BodyContainer isBodyError={isbodyError}>
        <div className="titleAndContent">
          <div className="title">Your Answer</div>
          <div className="content">
            The Answer contains details and results. Minimum 100 characters.
          </div>
        </div>
        <TextEditor
          classname="textEditor"
          value={body}
          onChange={handleBodyChange}
        />
        <div className="errMsgContainer">
          {!isBodyValid && (
            <div className="errormessage">
              <BsCheckLg />
              <div>
                The Answer must be at least 100 characters; you entered{' '}
                {bodyLength}.
              </div>
            </div>
          )}
        </div>
      </BodyContainer>
      <BtnContainer>
        <ButtonFixed
          onClick={handleSubmit}
          color="Blue"
          label={<Link>Post Your Answer</Link>}
        ></ButtonFixed>
      </BtnContainer>
      {isModalOpen && (
        <ModalContainer>
          <ModalContent>
            <div>Are you sure you want to submit?</div>
            <ButtonContainer>
              <Button onClick={handleConfirm}>Confirm</Button>
              <Button onClick={handleCancel}>Cancle</Button>
            </ButtonContainer>
          </ModalContent>
        </ModalContainer>
      )}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const NumAndSort = styled.ul`
  display: flex;
  justify-content: space-between;
  .answersNum {
    font-size: 1.2rem;
    font-weight: 400;
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

const BodyContainer = styled.div`
  height: 60vh;
  border: 1px solid #d4d4db;
  border-radius: 5px;
  margin-top: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .ql-editor {
    height: 40vh;
    border: 2px solid
      ${(props) => (props.isBodyError ? 'var(--color-gray)' : 'red')};
  }
  .titleAndContent {
    padding: 1rem;
  }
  .title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .content {
    font-size: 18px;
  }
  .errMsgContainer {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 1rem;
    div {
      color: red;
    }
  }
  .errormessage {
    display: flex;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 2.5rem;
  border-radius: 5px;
  width: 32rem;
  height: 10rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
`;
