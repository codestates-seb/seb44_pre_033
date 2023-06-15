import { styled } from 'styled-components';
import Answer from '../components/Answer';
import Content from '../components/Content';
import Title from '../components/Title';

export default function Detail() {
  return (
    <Container>
      <Title />
      <Content />
      <Answer />
    </Container>
  );
}

const Container = styled.div`
    padding: 1rem;
`