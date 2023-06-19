import { styled } from 'styled-components';
import { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import DiscardAlarm from '../ask/DiscardAlarm.jsx';
import TextEditor from '../common/TextEditor.jsx';

const TitleContainer = styled.div`
  width: 60vw;
  height: 30vh;
  border: 1px solid #d4d4db;
  border-radius: 5px;
  margin-top: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 255);

  .title {
    font-size: 20px;
    font-weight: 700;
    margin-left: 2vw;
    margin-bottom: 1vh;
  }
  .content {
    font-size: 18px;
    margin-left: 2vw;
    margin-bottom: 1vh;
  }

  input {
    width: 56vw;
    height: 5vh;
    margin-left: 2vw;
    border: 1px solid ${(props) => (props.isTitleError ? 'red' : 'black')};
  }
  .errormessage {
    display: flex;
    flex-direction: row;
    margin-left: 2vw;
    margin-top: 1vh;
    color: ${(props) => (props.isTitleError ? 'red' : 'black')};
  }

  .errorcontent {
    color: red;
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
    color: ${(props) => (props.isTitleError ? '#dbdcdc' : 'red')};
  }
  .errorcontent {
    color: ${(props) => (props.isTitleError ? '#dbdcdc' : 'red')};
  }
`;

const ButtonContainer = styled.div`
  width: 55vw;
  height: 20vh;
`;

const AskForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBodyChange = (value) => {
    setBody(value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const isTitleValid = title.length >= 15;
  const isBodyValid = body.length >= 100;

  return (
    <div className="questionContianer">
      <TitleContainer isTitleError={!isTitleValid}>
        <div className="title">Title</div>
        <div className="content">
          Be specific and imagine you’re asking a question to another person.
        </div>
        <input value={title} onChange={handleTitleChange}></input>

        {!isTitleValid && (
          <div className="errormessage">
            <BsCheckLg />
            <div className="errorcontent">
              Title must be at least 15 characters.
            </div>
          </div>
        )}
      </TitleContainer>
      <BodyContainer isTitleError={!isTitleValid} isBodyError={!isBodyValid}>
        <div className="title">Body</div>
        <div className="content">
          The body of your question contains your problem details and results.
          Minimum 100 characters.
        </div>
        <TextEditor value={body} onChange={handleBodyChange} />
        {!isBodyValid && (
          <div className="errormessage">
            <BsCheckLg />
            <div className="errorcontent">
              Body must be at least 100 characters; you entered {body.length}.
            </div>
          </div>
        )}
      </BodyContainer>
      <ButtonContainer>
        <button></button>
        <button onClick={handleOpenModal}></button>
      </ButtonContainer>
      {openModal ? <DiscardAlarm /> : null}
    </div>
  );
};

export default AskForm;
