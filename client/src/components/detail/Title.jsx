import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import ButtonFixed from '../common/ButtonFixed';
export default function Title({ questionInfo }) {
  return (
    <Container>
      <QuestionHeader>
        <div>{questionInfo.title}</div>
        <ButtonFixed
          label={<Link to="/questions/ask">Ask Question</Link>}
          color="Blue"
        ></ButtonFixed>
      </QuestionHeader>
      <QuestionInfo>
        <InfoDetail>
          <Span>added</Span>
          <span>{questionInfo.createdDateTime}</span>
        </InfoDetail>
        <InfoDetail>
          <Span>Modified</Span>
          <span>{questionInfo.updatedDateTime}</span>
        </InfoDetail>
        <InfoDetail>
          <Span>Viewed</Span>
          <span>{questionInfo.viewed} Times</span>
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
