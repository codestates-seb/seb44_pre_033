import { styled } from 'styled-components';
import NotFoundimg from '../assets/752755.png';

const NotFoundPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f4;

  img {
    width: 10rem;
    height: 10rem;
    margin-right: 1rem;
    margin-left: -1rem;
    margin-top: -5rem;
  }

  .topcontent {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;

    .title {
      font-size: 1.8rem;
      font-weight: 500;
    }
  }

  .bottomcontent {
    line-height: 1.2;
  }
`;

const ContentContainer = styled.div`
  margin-top: -5rem;
`;

const NotFound = () => {
  return (
    <NotFoundPageContainer>
      <div className="imgcontainer">
        <img className="img" src={NotFoundimg} alt="icon"></img>
      </div>
      <ContentContainer>
        <div className="topcontent">
          <div className="title">Page not found</div>
          <div>We're sorry, we couldn't find the page you requested.</div>
        </div>
        <div className="bottomcontent">
          <div>Try serching similar questions.</div>
          <div>Browse our recent questions.</div>
          <div>Browse our popular tags.</div>
          <div>
            If you feel something is missing that should be here, contact us.
          </div>
        </div>
      </ContentContainer>
    </NotFoundPageContainer>
  );
};

export default NotFound;
