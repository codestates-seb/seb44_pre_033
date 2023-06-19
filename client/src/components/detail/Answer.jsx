import styled from 'styled-components';
import { useState } from 'react';
import Content from './Content';
import TextEditor from '../common/TextEditor.jsx';
import { BsCheckLg } from 'react-icons/bs';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ButtonFixed from '../common/ButtonFixed';

export default function Answer({ answerInfo }) {
  const params = useParams();
  const navigate = useNavigate();
  const [body, setBody] = useState('');
  const [isBodyValid, setIsBodyValid] = useState(true);
  let bodyLength = body.replace(/<[^>]*>/g, '').length;
  const handleBodyChange = (value) => {
    setBody(value);
    if (bodyLength < 100) {
      setIsBodyValid(false);
    } else if (bodyLength >= 100) {
      setIsBodyValid(true);
    }
  };
  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/answers', {
        id: new Date().getTime(),
        questionId: Number(params.id),
        name: 'userName',
        content: body,
        createdDateTime: new Date().toLocaleString(),
        like: 0,
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/detail/${params.id}`);
      })
      .catch(() => {
        console.error('잘못된 접근입니다.');
      });
  };

  return (
    <Container>
      <NumAndSort>
        <div className="answersNum">
          {answerInfo && answerInfo.length} Answers
        </div>
        <div className="sort">
          <label>Sorted by: </label>
          <select>
            <option value="highest">Highest Score(dafault)</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </NumAndSort>
      {answerInfo &&
        answerInfo.map((answer) => (
          <li key={answer.id}>
            <Content props={answer} contentType={'answers'} />
          </li>
        ))}
      <BodyContainer isBodyError={isBodyValid}>
        <div className="titleAndContent">
          <div className="title">Your Answer</div>
          <div className="content">
            The Answer contains details and results. Minimum 100 characters.
          </div>
        </div>
        <TextEditor value={body} onChange={handleBodyChange} />
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
    border: 1px solid
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
  }
  .errormessage {
    display: flex;
    color: ${(props) => (props.isBodyError ? 'var(--color-gray)' : 'red')};
  }
`;

const BtnContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;
