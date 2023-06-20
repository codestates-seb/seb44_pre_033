import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';
import TextEditor from '../components/common/TextEditor.jsx';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ButtonFixed from '../components/common/ButtonFixed';
import ButtonFlex from '../components/common/ButtonFlexible';
import Aside from '../components/common/Aside';

export default function Edit() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isBodyValid, setIsBodyValid] = useState(true);
  let [questionId, setQuestionId] = useState(undefined);
  let bodyLength = body.replace(/<[^>]*>/g, '').length;
  const handleBodyChange = (value) => {
    setBody(value);
    if (bodyLength < 100) {
      setIsBodyValid(false);
    } else if (bodyLength >= 100) {
      setIsBodyValid(true);
    }
  };
  const navigate = useNavigate();
  const params = useParams();

  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type');

  useEffect(() => {
    axios(`http://localhost:3000/${type}/${params.id}`)
      .then((res) => {
        setBody(res.data.content);
        if (res.data.title) {
          setTitle(res.data.title);
        }else{
          setQuestionId(res.data.questionId)
        }
      })
      .catch(() => {
        console.error('질문을 가져오는 중에 문제가 발생했어요.');
      });
  }, []);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    localStorage.setItem('title', newTitle);
  };

  const handleSubmit = () => {
    axios
      .patch(`http://localhost:3000/${type}/${params.id}`, {
        content: body,
        ...(title ? { title: title } : null)
      })
      .then((res) => {
        navigate(`/detail/${questionId || params.id}`);
      })
      .catch((error) => {
        console.error('수정 중에 오류가 발생했습니다:', error);
      });
  };

  const isTitleValid = title.length >= 15;
  return (
    <Container>
      <ContainerLeft>
        {type === 'questions' ? (
          <TitleContainer isTitleError={!isTitleValid}>
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
        <ButtonContainer>
          <ButtonFixed onClick={handleSubmit} color="Blue" label="Save edits" />
          <ButtonFlex
            label={
              <Link
                to={`/detail/${type === 'questions' ? params.id : questionId}`}
              >
                Cancle
              </Link>
            }
            length="0"
            color=""
          />
        </ButtonContainer>
      </ContainerLeft>
      <Aside />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  @media (max-width: 980px) {
    flex-direction: column;
    aside {
      width: 100%;
      margin-top: 2rem;
    }
  }
`;
const ContainerLeft = styled.div`
  margin-right: 1rem;
  flex-grow: 1;
  @media (max-width: 980px) {
    margin-right: 0;
  }
`;
const TitleContainer = styled.div`
  border: 1px solid #d4d4db;
  border-radius: 5px;
  padding: 1rem;
  margin-top: 3vh;
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
    height: 5vh;
    border: 1px solid ${(props) => (props.isTitleError ? 'red' : 'black')};
  }
  .errormessage {
    display: flex;
    flex-direction: row;
    margin-top: 1vh;
    color: ${(props) => (props.isTitleError ? 'red' : 'black')};
  }

  .errorcontent {
    color: red;
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

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  & :first-child {
    margin-right: 1rem;
  }
`;
