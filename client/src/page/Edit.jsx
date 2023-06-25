import { useState, useEffect } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import TextEditor from '../components/common/TextEditor.jsx';
import ButtonFixed from '../components/common/ButtonFixed';
import ButtonFlex from '../components/common/ButtonFlexible';
import Aside from '../components/common/Aside';
import Modal from '../components/detail/Modal';
import LeftNav from '../components/common/LeftNav';

export default function Edit({onLogin}) {
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isBodyValid, setIsBodyValid] = useState(true);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isCancleModalOpen, setIsCancleModalOpen] = useState(false);

  let titleLength = title.length;
  let bodyLength = body.replace(/<[^>]*>/g, '').length;
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type');

  const handleBodyChange = (value) => {
    setBody(value);
    if (bodyLength < 100) {
      setIsBodyValid(false);
    } else if (bodyLength >= 100) {
      setIsBodyValid(true);
    }
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (titleLength < 15) {
      setIsTitleValid(false);
    } else if (titleLength >= 15) {
      setIsTitleValid(true);
    }
  };

  //원본 게시물 제목과 내용을 불러옵니다.
  useEffect(() => {
    axios(`http://localhost:3000/${type}/${params.id}`)
      .then((res) => {
        //게시물 내용을 저장합니다.
        setBody(res.data.content);
        //질문이라면 title도 저장합니다.
        if (res.data.title) {
          setTitle(res.data.title);
        } else {
          //답변이라면 라우팅을 위해 questionId 값을 저장합니다.
          const questionId = res.data.questionId;
          return questionId
        }
      })
      .catch(() => {
        console.error('질문을 가져오는 중에 문제가 발생했어요.');
      });
  }, []);

  //제출 모달
  const handleSubmit = () => {
    setIsPostModalOpen(true);
  };

  //제목과 내용이 모두 유효하면 데이터 수정 요청을 합니다.
  const handleEditConfirm = () => {
    if (isBodyValid && isTitleValid) {
      axios
        .patch(`http://localhost:3000/${type}/${params.id}`, {
          content: body,
          modifiedAt: new Date().toLocaleString(),
          ...(title ? { title: title } : null),
        })
        .then((res) => {
          navigate(`/detail/${questionId || params.id}`);
        })
        .catch((error) => {
          console.error('수정 중에 오류가 발생했습니다:', error);
        });
    } else {
      console.log('길이를 수정해주세요');
    }
    setIsPostModalOpen(false);
  };

  const handleModalClose = () => {
    setIsPostModalOpen(false);
  };

  //수정 취소 모달
  const handleCancleModal = () => {
    setIsCancleModalOpen(true);
  };

  //사용자가 수정 취소를 원하면 해당 글 페이지로 라우팅됩니다.
  const handleCancleConfirm = () => {
    navigate(`/detail/${type === 'questions' ? params.id : questionId}`);
  };

  //사용자가 수정 취소를 원하지 않으면 모달만 닫힙니다.
  const handleEditCancel = () => {
    setIsCancleModalOpen(false);
  };

  return (
    <Container>
      <LeftNav />
      <EditSection>
        <TitleAndContent>
          {type === 'questions' ? (
            <TitleContainer istitleerror={isTitleValid ? 1 : 0}>
              <div className="title">Title</div>
              <div className="content">
                Be specific and imagine you’re asking a question to another
                person.
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
          ) : null}
          <BodyContainer isbodyerror={isBodyValid ? 1 : 0}>
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
          <ButtonContainer>
            <ButtonFixed
              onClick={handleSubmit}
              color="Blue"
              label="Save edits"
            />
            <ButtonFlex onClick={handleCancleModal} label="Cancle" />
          </ButtonContainer>
          {/* 수정 완료 모달 */}
          {isPostModalOpen && (
            <Modal
              meassage={'Are you sure you want to submit?'}
              confirmFunction={handleEditConfirm}
              closeFunction={handleModalClose}
            />
          )}
          {/* 수정 취소 모달 */}
          {isCancleModalOpen && (
            <Modal
              meassage={'Are you sure you want to cancle?'}
              confirmFunction={handleCancleConfirm}
              closeFunction={handleEditCancel}
            />
          )}
        </TitleAndContent>
        <Aside />
      </EditSection>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const EditSection = styled.div`
  display: flex;
  padding: 1rem;
  flex-grow: 1;
  @media (max-width: 980px) {
    flex-direction: column;
    aside {
      width: 100%;
      margin-top: 2rem;
    }
  }
`;
const TitleAndContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  @media (max-width: 980px) {
    margin-right: 0;
  }
`;

const TitleContainer = styled.div`
  border: 1px solid #d4d4db;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 255);

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
  height: 30rem;
  border: 1px solid var(--color-gray);
  border-radius: 5px;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;

  .ql-editor {
    height: 18rem;
    border: 1px solid
      ${(props) => (props.isbodyerror ? 'var(--color-gray)' : 'red')};
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
    * {
      color: red;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  & :first-child {
    margin-right: 1rem;
  }
`;
