import styled from 'styled-components';
import VoteBtns from './VoteBtns';
import UserInfo from '../common/UserInfo';

export default function Content({content,like,userName}) {
  return (
    <Container>
      <VoteBtns like={like} />
      <PostCell>
        <p>
          {content}
        </p>
        <ActionsAndProfile>
          <Features>
            <div>Share</div>
            <div>
              <a href="">Edit</a>
            </div>
            <div>
              <button>Delete</button>
            </div>
          </Features>
          <UserInfo userName={userName}/>
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
  div{
    margin-right: 0.5rem;
  }
`;