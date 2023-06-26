import { styled } from 'styled-components';

export default function Aside() {
  return (
    <>
    <AsideContainer>
        <AsideArticle>
            <AsideTitle>
                The OverFlow Blog
            </AsideTitle>
            <AsideBody>
                <AsideList>
                    Hype or not? AI’s benefits for developers explored in the 2023 Developer Survey
                </AsideList>
                <AsideList>
                    Pair programing? We peek under the hood of Duet, Google’s coding assistant....
                </AsideList>
            </AsideBody>
        </AsideArticle>
        <AsideArticle>
            <AsideTitle>
                Featured on Meta
            </AsideTitle>
            <AsideBody>
                <AsideList>
                    Planned maintenance scheduled for Thursday, June 15, 2023 at 21:00 UTC
                </AsideList>
                <AsideList>
                    Stack Exchange Network Outage – June 15, 2023
                </AsideList>
                <AsideList>
                    Does the policy change for AI-generated content affect users who (want to)...
                </AsideList>
                <AsideList>
                    Temporary policy: ChatGPT is banned
                </AsideList>
                <AsideList>
                    We are seeking functional feedback for the formatting assistant
                </AsideList>
            </AsideBody>
        </AsideArticle>
    </AsideContainer>
    </>
  )
}


const AsideContainer = styled.aside`
    display: flex;
    flex-direction: column;
    min-width: 18rem;
    flex-grow:0;
`;

const AsideArticle = styled.article`
    display: flex;
    flex-direction: column;
`;

const AsideTitle = styled.div`
    border: 0.1rem solid #f1e576;
    padding: 1.2rem 1.5rem;
    background-color: #fbf3d5;
    font-size: 0.9rem;
    font-weight: 600;
`;

const AsideBody = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    border: solid #f1e576;
    border-width: 0 0.1rem;
    padding: 1.2rem 1.5rem;
    background-color: #fdf7e2;
    font-size: 0.9rem;
`;

const AsideList = styled.div`
    margin: 0.2rem 0;
`;
