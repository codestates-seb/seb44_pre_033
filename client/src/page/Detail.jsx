import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';
import Answer from '../components/detail/Answer';
import Content from '../components/detail/Content';
import Title from '../components/detail/Title';

export default function Detail() {
  const params = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios(
      `https://f3f88dd8-9808-4603-9595-4222f8943fc3.mock.pstmn.io/detail/${params.id}`
    )
      .then((res) => setData(res.data))
      .catch(() => {
        console.error('페이지가 이상해잉');
      });
  }, []);
  console.log(data)
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title questionInfo={data} />
      <Content content={data.content} like={data.like} userName={data.name}/>
      <Answer answerInfo={data.answer}/>
    </Container>
  );
}

const Container = styled.div`
    padding: 1rem;
`
