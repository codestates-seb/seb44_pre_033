import AskForm from '../components/ask/AskForm.jsx';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AskPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f1f2f3;
  padding: 1rem;
`;
const BigTitleContainer = styled.div`
width:100%;
padding: 1rem;
margin-bottom: 3rem;
margin-left:3rem;
  .bigtitle {
    font-size: 2.5rem;
    font-weight: 500;
  }
`;

const Ask = ({ onLogin }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!onLogin) {
      alert('Wrong Excess');
      navigate('/');
    }
  }, []);

  return (
    <>
      {onLogin ? (
        <AskPageContainer>
          <BigTitleContainer>
            <div className="bigtitle">Ask a public question</div>
          </BigTitleContainer>
          <AskForm />
        </AskPageContainer>
      ) : null}
    </>
  );
};

export default Ask;
