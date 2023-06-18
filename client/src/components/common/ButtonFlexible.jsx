import styled from "styled-components"

export default function ButtonFlex({label}) {
    return (
    <>
        <BlueButtonFlexible label={label}>{label}</BlueButtonFlexible>
    </>
    );
  }
  
const ButtonFlexible = styled.div`
    /* 버튼 기본 설정 */
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props)=>(props.label.length*1.3)}rem; 
    height: 32px;
    padding: 8px;
    font-size: 1.3rem;
    border-radius: 4px;

`;  

const BlueButtonFlexible = styled(ButtonFlexible)`
    /* 파란색 버튼 */
    background-color: var(--color-blue);
    color: white;
    border: 1px solid  var(--color-blue);
    &:hover {
        background-color: #075EC3;
    }
`;

const GrayButtonFlexible = styled(ButtonFlexible)`
    /* 파란색 버튼 */
    background-color: 	#e1ecf4;
    color: 	#39739d;
    border: 1px solid 	#7aa7c7;
    &:hover {
        background-color: #0063bf;
    }
`;
