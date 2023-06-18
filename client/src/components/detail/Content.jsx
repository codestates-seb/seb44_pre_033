import styled from 'styled-components';
import VoteBtns from './VoteBtns';
import UserInfo from '../common/UserInfo';
import axios from 'axios';

export default function Content({ props,contentType }) {
  const handleDelete = () =>{
    axios.delete(`http://localhost:3000/${contentType}/${props.id}`)
    .then(()=>console.log('성공?'))
    .catch(()=>console.log('실패!'))
  }
  return (
    <Container>
      <VoteBtns like={props.like} id={props.id} contentType={contentType}/>
      <PostCell>
        <p dangerouslySetInnerHTML={{__html:props.content}}></p>
        <ActionsAndProfile>
          <Features>
            <div>Share</div>
            <div>
              <a href={`/posts/${props.id}/edit`}>Edit</a>
            </div>
            <div>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </Features>
          <UserInfo userName={props.name} createdDateTime={props.createdDateTime}/>
        </ActionsAndProfile>
      </PostCell>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  padding: 1rem;
`;

const PostCell = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ActionsAndProfile = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Features = styled.div`
  display: flex;
  & * {
    color: var(--color-gray);
  }
  div {
    margin-right: 0.5rem;
  }
`;
