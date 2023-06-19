import styled from "styled-components"

// <ButtonFlex label='버튼내용' color='파란버튼일때만 Blue라고 넣으면 됩니다.' length='기본길이는0, 길이 조절하려면 필요한만큼 숫자 넣으면 됩니다.'  />
export default function ButtonFlex({label, color, length}) {
    return (
    <>
        {color==='Blue' ? 
            <BlueButtonFlexible label={label} length={length} >{label}</BlueButtonFlexible> : 
            <GrayButtonFlexible label={label} length={length} >{label}</GrayButtonFlexible>
        }
        
    </>
    );
  }
  
const ButtonFlexible = styled.div`
    /* 버튼 기본 설정 */
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props)=>(props.label.length*0.6+props.length*0.2)}rem; 
    height: 2.6rem;
    padding: 0.5rem;
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
