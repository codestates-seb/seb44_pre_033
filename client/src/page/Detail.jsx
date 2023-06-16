import { styled } from 'styled-components';
import Answer from '../components/detail/Answer';
import Content from '../components/detail/Content';
import Title from '../components/detail/Title';

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