import styled from 'styled-components';
import Content from './Content';

export default function Answer() {
  return (
    <Container>
      <AnswerInfo>
        <div>1 Answer</div>
        <div>
          <label>Sorted by: </label>
          <Select>
            <option value="highest">Highest Score(dafault)</option>
            <option value="newest">Newest</option>
          </Select>
        </div>
      </AnswerInfo>
      <Content />
      <div>에디터 컴포넌트 예정</div>
      <button>버튼컴포넌트예정</button>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const AnswerInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Select = styled.select`
  padding: 0.5rem;
`;
