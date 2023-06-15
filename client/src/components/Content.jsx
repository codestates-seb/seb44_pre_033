import { useState } from 'react';
import styled from 'styled-components';
import {
  FaCaretUp,
  FaCaretDown,
  FaRegBookmark,
  FaBookmark,
} from 'react-icons/fa';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import ProfileImg from '../assets/profile.png';

export default function Content() {
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  return (
    <Container>
      <VoteCell>
        <VoteBtn>
          <FaCaretUp />
        </VoteBtn>
        <Count>0</Count>
        <VoteBtn>
          <FaCaretDown />
        </VoteBtn>
        <SaveBtn
          onClick={() => {
            setIsSaveClicked(!isSaveClicked);
          }}
          isSaveClicked={isSaveClicked}
        >
          {isSaveClicked ? <FaBookmark /> : <FaRegBookmark />}
        </SaveBtn>
        <TimeBtn>
          <RxCounterClockwiseClock />
        </TimeBtn>
      </VoteCell>
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
          <Profile>
            <div>asked 14 hours ago</div>
            <UserInfo>
              <ProfileImage src={ProfileImg}></ProfileImage>
              <div>Jinsoul Kim</div>
            </UserInfo>
          </Profile>
        </ActionsAndProfile>
      </PostCell>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  padding: 1rem;
`;

const VoteCell = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;

const VoteBtn = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: 1px #bbc0c4 solid;
  background: transparent;
  border-radius: 50%;
  &:hover {
    background: #fce3cf;
  }
`;

const Count = styled.div`
    text-align: center;
    margin: 1rem 0;
`
const SaveBtn = styled.button`
  background-color: transparent;
  width: 2.5rem;
  height: 2rem;
  color: ${(props) => (props.isSaveClicked ? '#F48024' : '#BBC0C4')};
`;

const TimeBtn = styled.button`
  background-color: transparent;
  color: #bbc0c4;
  width: 2.5rem;
  height: 2rem;
  &:hover {
    color: #0095ff;
  }
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
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background-color: #daeaf7;
`;
const UserInfo = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;
const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 0.5rem;
`;
