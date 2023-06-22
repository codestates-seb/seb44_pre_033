import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import DiscardAlarm from '../ask/DiscardAlarm.jsx';
import TextEditor from '../common/TextEditor.jsx';
import ButtonFlex from '../common/ButtonFlexible.jsx';
import axios from 'axios';

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
    color: black;
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

  .textEditor {
    height: 40vh;
  }

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

  .content {
    font-size: 18px;
    margin-left: 2vw;
    margin-bottom: 1vh;
    color: ${(props) => (props.isTitleError ? '#dbdcdc' : 'black')};
  }

  .errormessage {
    margin-top: 1.5vh;
    width: 40rem;
    height: 1.5rem;
    display: flex;
    flex-direction: row;
    margin-left: 2vw;
  }
  .errorcontent {
    color: ${(props) => (props.isTitleError ? '#f6f6f7' : 'red')};
  }
  .errormark {
    color: ${(props) => (props.isTitleError ? '#f6f6f7' : 'red')};
  }

  .title {
    font-size: 20px;
    font-weight: 700;
    margin-left: 2vw;
    margin-bottom: 1vh;
    color: ${(props) => (props.isTitleError ? '#dbdcdc' : 'black')};
  }
`;

const ButtonContainer = styled.div`
  margin-top: 2vh;
  width: 55vw;
  height: 20vh;
  display: flex;
  flex-direction: row;
`;

const DiscardButton = styled.button`
  margin-left: 1vw;
  width: 7rem;
  height: 2.6rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  background-color: #f8f9f9;
  color: #ab262a;
  border: none;
  &:hover {
    background-color: #fdf2f2;
  }
  a {
    color: #ab262a;
  }
  display: flex;
  align-items: center;
  justify-content: center;
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
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
`;

const ButtonContainer2 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
`;
const AskForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  //페이지가 로드될때 마다, 로컬 스토리지에서 이전에 저장한 값이 있는지 확인하고 가져옵니다
  useEffect(() => {
    const savedTitle = localStorage.getItem('title');
    const savedBody = localStorage.getItem('body');

    if (savedTitle) {
      setTitle(savedTitle);
    }
    if (savedBody) {
      setBody(savedBody);
    }
  }, []);

  //입력창의 내용이 변경될때마다 상태를 업데이트하고, 로컬 저장소에 저장합니다
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    localStorage.setItem('title', newTitle);
  };

  const handleBodyChange = (value) => {
    setBody(value);
    localStorage.setItem('body', value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDiscardQuestion = () => {
    setTitle('');
    setBody('');
    setOpenModal(false);
    window.scrollTo(0, 0);
  };

  const handleCancelButton = () => {
    setOpenModal(false);
    window.scrollTo(0, 0);
  };
  const handleSubmit = () => {
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (isBodyValid && bodyLength) {
      axios
        .post('http://localhost:3000/questions', {
          title: title,
          userId: 1, //user.id로 변경하기
          name: 'kimcoding', //서버연결전 지우기
          content: body,
          createdAt: new Date().toLocaleString(),
          modifiedAt: new Date().toLocaleString(),
        })
        .then((res) => {
          localStorage.removeItem('title');
          localStorage.removeItem('body');
          navigate(`/`);
        })
        .catch(() => {
          console.error('잘못된 접근입니다.');
        });
    } else {
      console.log('길이를 수정해주세요');
    }
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };
  const isTitleValid = title.length >= 15;
  let bodyLength = body.replace(/<[^>]*>/g, '').length;
  const isBodyValid = bodyLength >= 100;

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
        <TextEditor
          classname="textEditor"
          value={body}
          onChange={handleBodyChange}
        />
        <div className="errormessage">
          {!isBodyValid && (
            <>
              <BsCheckLg className="errormark" />
              <div className="errorcontent">
                Body must be at least 100 characters; you entered {bodyLength}.
              </div>
            </>
          )}
        </div>
      </BodyContainer>
      <ButtonContainer>
        <ButtonFlex
          onClick={handleSubmit}
          label="Post Your Question"
          color="Blue"
        />
        <DiscardButton onClick={handleOpenModal}>Discard draft</DiscardButton>
      </ButtonContainer>
      {openModal ? (
        <DiscardAlarm
          onDiscardQuestion={handleDiscardQuestion}
          onCancelButton={handleCancelButton}
          handleCloseModal={handleCloseModal}
        />
      ) : null}
      {isModalOpen && (
        <ModalContainer>
          <ModalContent>
            <div>Are you sure you want to submit?</div>
            <ButtonContainer2>
              <Button onClick={handleConfirm}>Confirm</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </ButtonContainer2>
          </ModalContent>
        </ModalContainer>
      )}
    </div>
  );
};

export default AskForm;
