import styled from "styled-components"

export default function ButtonFlex({label, color}) {
    return (
    <>
        {color==='Blue' ? 
            <BlueButtonFlexible label={label}>{label}</BlueButtonFlexible> : 
            <GrayButtonFlexible label={label}>{label}</GrayButtonFlexible>
        }
        
    </>
    );
  }
  
const ButtonFlexible = styled.div`
    /* 버튼 기본 설정 */
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props)=>(props.label.length*0.6)}rem; 
    height: ${(props)=>(props.label.length*0.2)}rem;
    padding: ${(props)=>(props.label.length*0.02)}rem;
    font-size: 1.1rem;
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
