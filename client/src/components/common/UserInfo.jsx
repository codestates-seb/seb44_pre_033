import styled from 'styled-components';
import ProfileImg from '../../assets/profile.png';

export default function UserInfo({userName}) {
  return (
    <Profile>
      <div>asked 14 hours ago</div>
      <UserDetail>
        <ProfileImage src={ProfileImg}></ProfileImage>
        <div>{userName}</div>
      </UserDetail>
    </Profile>
  );
}
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background-color: #daeaf7;
`;

const UserDetail = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 0.5rem;
`;
