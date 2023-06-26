import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import DiscardAlarm from '../ask/DiscardAlarm.jsx';
import TextEditor from '../common/TextEditor.jsx';
import ButtonFlex from '../common/ButtonFlexible.jsx';
import axios from 'axios';
import Modal from '../detail/Modal';

const QuestionContianer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  align-items: center;
`;
const TitleContainer = styled.div`
  border: 1px solid var(--color-gray);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 255);
  padding: 1rem;
  width: 100%;
  .title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 1vh;
  }
  .content {
    font-size: 18px;
    margin-bottom: 1vh;
  }

  input {
    height: 1.5rem;
    border: 1px solid ${(props) => (props.istitleerror ? 'black' : 'red')};
  }
  .errormessage {
    display: flex;
    flex-direction: row;
    margin-top: 1vh;
    color: red;
  }

  .errorcontent {
    color: red;
  }
`;

const BodyContainer = styled.div`
  width: 100%;
      max-width: 780px;
  border: 1px solid #d4d4db;
  border-radius: 5px;
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) =>
    props.istitleerror ? 'rgba(247,247,248,0.7)' : 'rgba(255, 255, 255, 255)'};
  pointer-events: ${(props) => (props.istitleerror ? 'none' : 'auto')};

  .textEditor {
    height: 40vh;
  }
  .titleAndContent {
    padding: 1rem;
  }
  .ql-editor {
    height: 18rem;
    border: 1px solid
      ${(props) =>
        !props.isbodyerror && !props.istitleerror
          ? 'red'
          : 'rgba(247,247,248,0.7)'};

    background-color: ${(props) =>
      props.istitleerror
        ? 'rgba(247,247,248,0.7)'
        : 'rgba(255, 255, 255, 255)'};
  }

  .title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${(props) => (props.istitleerror ? '#dbdcdc' : 'black')};
  }
  .content {
    font-size: 18px;
    margin-bottom: 0.5rem;
    color: ${(props) => (props.istitleerror ? '#dbdcdc' : 'black')};
  }
  .errMsgContainer {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 1rem;
  }
  .errormessage {
    display: flex;
    margin-top: 1rem;
    * {
      color: red;
    }
  }
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  width: 100%;
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

const AskForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  // const userId = localStorage.getItem('userId'); 로그인 시 저장한 유저의 아이디를 들고옵니다.
  // const token = localStorage.getItem('token');
  
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const handleBodyChange = (value) => {
    setBody(value);
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
        .post(
          'http://localhost:3000/questions',
          {
            title: title,
            userId: 1, //user.id로 변경하기
            name: 'kimcoding', //서버연결전 지우기
            content: body,
            createdAt: new Date().toLocaleString(),
            modifiedAt: new Date().toLocaleString(),
          },
          {
            headers: {
              // Authorization: token,
              // 'ngrok-skip-browser-warning': true, //ngrok 홈페이지 연결 막는 속성
            },
          }
        )
        .then((res) => {
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
    <QuestionContianer>
      <TitleContainer istitleerror={isTitleValid ? 1 : 0}>
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
      <BodyContainer
        istitleerror={isTitleValid ? 0 : 1}
        isbodyerror={isBodyValid ? 1 : 0}
      >
        <div className="bodyAndContent">
          <div className="title">Body</div>
          <div className="content">
            The body of your question contains your problem details and results.
            Minimum 100 characters.
          </div>
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
      {isModalOpen && (
        <Modal
          meassage={'Are you sure you want to submit?'}
          confirmFunction={handleConfirm}
          closeFunction={handleCancel}
        />
      )}
      {openModal ? (
        <DiscardAlarm
          onDiscardQuestion={handleDiscardQuestion}
          onCancelButton={handleCancelButton}
          handleCloseModal={handleCloseModal}
        />
      ) : null}
    </QuestionContianer>
  );
};

export default AskForm;
