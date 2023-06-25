import styled from 'styled-components';
import ButtonFix from '../common/ButtonFixed';
export default function Modal({meassage,confirmFunction,closeFunction}){
  const handleClick = (event) => {
    event.stopPropagation();
  };
    return(
        <ModalContainer onClick={closeFunction}>
          <ModalContent onClick={handleClick}>
            <div>{meassage}</div>
            <ButtonContainer>
              <ButtonFix color="Blue" label={"Confirm"} onClick={confirmFunction} />
              <ButtonFix label={"Cancle"} onClick={closeFunction} />
            </ButtonContainer>
          </ModalContent>
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  &:first-child {
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  & > :first-child{
    margin-right: 1rem;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
`;
