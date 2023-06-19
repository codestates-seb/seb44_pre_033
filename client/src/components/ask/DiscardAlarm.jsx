import { styled } from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const ModalView = styled.div`
  width: 35vw;
  height: 24vh;
  background-color: #ffffff;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  .titleContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .content {
    color: #3c4145;
  }

  .title {
    color: #ae2d31;
    font-size: 1.8rem;
    margin-right: 17rem;
    font-weight: 500;
  }

  .buttonContainer {
    display: flex;
    flex-direction: row;
    width: 35vw;
    margin-left: 4vw;
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
        <ModalView onClick={(event) => event.stopPropagation()}>
          <div className="titleContainer">
            <div className="title">Discard question</div>
            <button onClick={handleCloseModal}>✕</button>
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
