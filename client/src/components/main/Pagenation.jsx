import { styled } from 'styled-components';
// import { useState, useEffect } from 'react';

const Pagenation = ({limit, page, totalPosts, onClickPage})=>{
    const numPages = Math.ceil(totalPosts/limit)
    const pageNums=[];

    for(let i=1; i<=numPages ; i++){
        pageNums.push(i);
    }

    return (
        <PageSection>
      		<ButtonWrap>
      			{pageNums.map((_, i) => {
    				return (
                    	<Button key={i+1} onClick={()=>onClickPage(i+1)}>
                          {i+1}
                  		</Button>
                    );
                    })
				}
      		</ButtonWrap>
      	</PageSection>
    )
}

export default Pagenation;

const PageSection = styled.div`

`;

const ButtonWrap = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    font-size:2rem;
`;

const Button = styled.div`
    padding:0.5rem;
    border:0.05rem solid var(--color-gray);
`;