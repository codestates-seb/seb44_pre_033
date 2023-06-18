import styled from 'styled-components';
import { useState } from 'react';
import Content from './Content';
import TextEditor from '../common/TextEditor.jsx';
import { BsCheckLg } from 'react-icons/bs';

export default function Answer({ answerInfo }) {
  const [body, setBody] = useState('');
  const handleBodyChange = (value) => {
    setBody(value);
  };
  const isBodyValid = body.length >= 100;

  return (
    <Container>
      <NumAndSort>
        <div>{answerInfo && answerInfo.length} Answer</div>
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
            <Content props={answer}/>
          </li>
        ))}
      <BodyContainer isBodyError={!isBodyValid}>
        <div className="title">Body</div>
        <div className="content">
          The body of your question contains your problem details and results.
          Minimum 100 characters.
        </div>
        <TextEditor value={body} onChange={handleBodyChange} />
        {!isBodyValid && (
          <div className="errormessage">
            <BsCheckLg />
            <div>
              Body must be at least 100 characters; you entered {body.length}.
            </div>
          </div>
        )}
      </BodyContainer>
      <button>버튼컴포넌트예정</button>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const NumAndSort = styled.ul`
  display: flex;
  justify-content: space-between;
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
  width: 60vw;
  height: 63vh;
  border: 1px solid #d4d4db;
  border-radius: 5px;
  margin-top: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) =>
    props.isTitleError ? 'rgba(247,247,248,0.7)' : 'rgba(255, 255, 255, 255)'};
  pointer-events: ${(props) => (props.isTitleError ? 'none' : 'auto')};

  .ql-editor {
    width: 56vw;
    height: 40vh;
    margin-left: 2vw;
    border: 1px solid
      ${(props) =>
        props.isBodyError && !props.isTitleError
          ? 'red'
          : 'rgba(247,247,248,0.7)'};

    background-color: ${(props) =>
      props.isTitleError
        ? 'rgba(247,247,248,0.7)'
        : 'rgba(255, 255, 255, 255)'};
  }

  .title {
    font-size: 20px;
    font-weight: 700;
    margin-left: 2vw;
    margin-bottom: 1vh;
    color: ${(props) => (props.isTitleError ? '#dbdcdc' : 'black')};
  }

  .content {
    font-size: 18px;
    margin-left: 2vw;
    margin-bottom: 1vh;
    color: ${(props) => (props.isTitleError ? '#dbdcdc' : 'black')};
  }

  .errormessage {
    display: flex;
    flex-direction: row;
    margin-left: 2vw;
    margin-top: 2vh;
    color: ${(props) => (props.isBodyError ? 'red' : 'balck')};
    color: ${(props) => (props.isTitleError ? '#dbdcdc' : 'red')};
  }
`;
