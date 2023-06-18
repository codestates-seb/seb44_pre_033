import styled from 'styled-components';
import VoteBtns from './VoteBtns';
import UserInfo from '../common/UserInfo';

export default function Content({ props }) {
  return (
    <Container>
      <VoteBtns like={props.like} />
      <PostCell>
        <p>{props.content}</p>
        <ActionsAndProfile>
          <Features>
            <div>Share</div>
            <div>
              <a href={`/posts/${props.id}/edit`}>Edit</a>
            </div>
            <div>
              <button>Delete</button>
            </div>
          </Features>
          <UserInfo userName={props.name} />
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
