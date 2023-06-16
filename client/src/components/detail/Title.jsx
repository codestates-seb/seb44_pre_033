import { styled } from 'styled-components';

export default function Title() {
  return (
    <Container>
      <QuestionHeader>
        <div>Why this image is sometimes centered and sometimes not?</div>
        <button>버튼컴포넌트예정</button>
      </QuestionHeader>
      <QuestionInfo>
        <InfoDetail>
          <Span>added</Span>
          <span>Today</span>
        </InfoDetail>
        <InfoDetail>
          <Span>Modified</Span>
          <span>Today</span>
        </InfoDetail>
        <InfoDetail>
          <Span>Viewed</Span>
          <span>4 Times</span>
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
  justify-content: space-between;
  font-size: 1.65rem;
  margin-bottom: 0.5rem;
`;
const QuestionInfo = styled.div`
  display: flex;
  margin: 0.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #BBC0C4 ;
`;
const InfoDetail = styled.div`
  display: flex;
  margin-right: 1rem;
  font-size: 0.75rem;
`;
const Span = styled.span`
  margin-right: 0.5rem;
  color: #BBC0C4;
`;
