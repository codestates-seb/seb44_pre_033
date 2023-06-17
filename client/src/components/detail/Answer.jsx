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
        <div className='sort'>
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
            <Content content={answer.content} like={answer.like} userName={answer.name}/>
          </li>
        ))}
      <TextEditor value={body} onChange={handleBodyChange} />
      {!isBodyValid && (
        <div className="errormessage">
          <BsCheckLg />
          <div>
            Body must be at least 100 characters; you entered {body.length}.
          </div>
        </div>
      )}
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
  & select{
    padding: 0.5rem;
    margin-left:0.5rem;
  }
`;
