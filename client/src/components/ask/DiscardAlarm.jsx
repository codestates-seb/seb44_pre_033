import { styled } from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  width: 32rem;
  height: 15rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  svg {
    font-size: 1.5rem;
  }
  .titleContainer {
    display: flex;
    justify-content: space-between;
  }

  .content {
    color: #3c4145;
  }

  .title {
    color: #ae2d31;
    font-size: 1.8rem;
    font-weight: 500;
  }

  .buttonContainer {
    display: flex;
  }

  .discardButtonText {
    background-color: #ae2d31;
    color: white;
    width: 8rem;
  }
  .cancleButtonText {
    background-color: #ffffff;
    color: #838a92;
    margin-left: 30px;

    &:hover {
      background-color: #f8f9f9;
    }
  }
`;

const ModalBackground = styled.div`
  background-color: rgba(136, 127, 127, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DiscardButton = styled.button`
  width: ${(props) => props.text.length * 10}px;
  border-radius: 3px;
  font-size: 1rem;
  height: 2.5rem;
`;

const discardButtonText = 'Discard question';
const cancleButtonText = 'Cancel';

const DiscardAlarm = ({
  onDiscardQuestion,
  onCancelButton,
  handleCloseModal,
}) => {
  return (
    <ModalContainer>
      <ModalBackground onClick={handleCloseModal}>
        <button className="closeBtn" onClick={handleCloseModal}>
          <AiOutlineCloseCircle />
        </button>
        <ModalView onClick={(event) => event.stopPropagation()}>
          <div className="titleContainer">
            <div className="title">Discard question</div>
          </div>
          <div className="content">
            Are you sure you want to discard this question? This cannot be
            undone.
          </div>

          <div className="buttonContainer">
            <DiscardButton
              onClick={onDiscardQuestion} //버튼 클릭시 초기화 및 스크롤 이동처리
              className="discardButtonText"
              text={discardButtonText}
            >
              {discardButtonText}
            </DiscardButton>
            <DiscardButton
              className="cancleButtonText"
              text={cancleButtonText}
              onClick={onCancelButton}
            >
              {cancleButtonText}
            </DiscardButton>
          </div>
        </ModalView>
      </ModalBackground>
    </ModalContainer>
  );
};

export default DiscardAlarm;
