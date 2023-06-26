import styled from 'styled-components';
import ProfileImg from '../../assets/profile.png';
import displayedAt from '../common/DisplayedAt';

export default function UserInfo({userName,createdAt}) {
  return (
    <Profile>
      <div>{displayedAt(new Date(createdAt))}</div>
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
