import { styled } from 'styled-components';
import community1 from '../../assets/community_1.svg';
import community2 from '../../assets/community_2.svg';
import community3 from '../../assets/community_3.svg';
import community4 from '../../assets/community_4.svg';

const LeftContentContainer = styled.div`
  width: 28rem;
  height: 20rem;
  margin-left: -5vw;
  margin-right: 5vw;
  margin-top: -15vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .sentence {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .Teamsfree {
    color: #3f77ce;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .icon {
    margin-right: 1vw;
  }

  .undercontent {
    font-size: 0.8rem;
    line-height: 1.3;
    margin-bottom: -2vh;
  }
`;

const LeftContent = () => {
  return (
    <LeftContentContainer>
      <div className="title">Join the Stack Overflow community</div>
      <div className="sentence">
        <img src={community1} alt="icon" className="icon"></img>
        <div>Get unstuck — ask a question</div>
      </div>
      <div className="sentence">
        <img src={community2} alt="icon" className="icon"></img>
        <div>Unlock new privileges like voting and commenting</div>
      </div>
      <div className="sentence">
        <img src={community3} alt="icon" className="icon"></img>
        <div>Save your favorite questions, answers, watch tags, and more</div>
      </div>
      <div className="sentence">
        <img src={community4} alt="icon" className="icon"></img>
        <div>Earn reputation and badges</div>
      </div>
      <div className="undercontent">
        <div>
          Collaborate and share knowledge with a private group for FREE.
        </div>
        <div className="Teamsfree">
          Get Stack Overflow for Teams free for up to 50 users.
        </div>
      </div>
    </LeftContentContainer>
  );
};

export default LeftContent;
