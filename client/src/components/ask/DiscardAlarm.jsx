import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const ModalView = styled.div`
  width: 20vw;
  height: 15vh;
  background-color: #ffffff;
`;

const ModalBackground = styled.div`
  background-color: rgba(136, 127, 127, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DiscardAlarm = () => {
  return (
    <ModalContainer>
      <ModalBackground>
        <ModalView>
          <div>Discard question</div>
          <div>
            Are you sure you want to discard this question? This cannot be
            undone.
          </div>
          <button>Discard question</button>
          <button>Cancel</button>
        </ModalView>
      </ModalBackground>
    </ModalContainer>
  );
};

export default DiscardAlarm;
