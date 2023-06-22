import AskForm from '../components/ask/AskForm.jsx';
import { styled } from 'styled-components';

const AskPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f1f2f3;
`;
const BigTitleContainer = styled.div`
  width: 60vw;
  height: 15vh;

  .bigtitle {
    font-size: 2rem;
    font-weight: 500;
    margin-top: 8vh;
  }
`;

const Ask = () => {
  return (
    <AskPageContainer>
      <BigTitleContainer>
        <div className="bigtitle">Ask a public question</div>
      </BigTitleContainer>
      <AskForm />
    </AskPageContainer>
  );
};

export default Ask;
