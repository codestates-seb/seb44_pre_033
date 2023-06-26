import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ButtonFixed from '../common/ButtonFixed';
import displayedAt from '../common/DisplayedAt';

export default function Title({
  questionTitle,
  createdAt,
  modifiedAt,
  onLogin,
}) {
  const navigate = useNavigate();
  
  const askClickHandler = () => {
    if (!onLogin) {
      alert('Please log in to post a question.');
      navigate('/users/login');
    } else {
      navigate('/questions/ask');
    }
  };

  return (
    <Container>
      <QuestionHeader>
        <h1 className="questionTitle">{questionTitle}</h1>
        <ButtonFixed
          label="Ask Question"
          color="Blue"
          onClick={askClickHandler}
        ></ButtonFixed>
      </QuestionHeader>
      <QuestionInfo>
        <InfoDetail>
          <Span>added</Span>
          <span>{displayedAt(new Date(createdAt))}</span>
        </InfoDetail>
        <InfoDetail>
          <Span>Modified</Span>
          <span>{displayedAt(new Date(modifiedAt))}</span>
        </InfoDetail>
        <InfoDetail>
          <Span>viewed</Span>
          {/* 조회수 기능 완료시 변수명으로 수정하기 */}
          <span>{3} times</span>
        </InfoDetail>
      </QuestionInfo>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  .questionTitle {
    font-size: 1.65rem;
    font-weight: 700;
  }
`;
const QuestionInfo = styled.div`
  display: flex;
  margin: 0.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-gray);
`;
const InfoDetail = styled.div`
  display: flex;
  margin-right: 1rem;
  font-size: 0.75rem;
`;
const Span = styled.span`
  margin-right: 0.5rem;
  color: var(--color-gray);
`;
