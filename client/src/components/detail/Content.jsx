import styled from 'styled-components';
import VoteBtns from './VoteBtns';
import UserInfo from '../common/UserInfo';

export default function Content() {
  return (
    <Container>
      <VoteBtns />
      <PostCell>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nobis
          error iure nemo exercitationem, nulla sunt blanditiis, excepturi
          fugiat cupiditate aut necessitatibus ex vitae accusamus vero aliquid
          sed repellat deserunt! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Minima tempore natus temporibus accusamus doloribus
          alias voluptatum reprehenderit harum dolorum quis placeat quae,
          distinctio ratione nulla assumenda excepturi rerum, maiores molestias?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo possimus
          quaerat sit odio, delectus ut. Omnis maxime labore numquam aperiam,
          accusantium temporibus repellat praesentium earum molestiae eos.
          Quidem, tenetur totam!
        </p>
        <ActionsAndProfile>
          <Features>
            <Div>Share</Div>
            <Div>
              <a href="">Edit</a>
            </Div>
            <Div>
              <button>Delete</button>
            </Div>
          </Features>
          <UserInfo/>
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
`;

const ActionsAndProfile = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Features = styled.div`
  display: flex;
  & * {
    color: #6a737c;
  }
`;
const Div = styled.div`
  margin-right: 0.5rem;
`;
