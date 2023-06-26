import { styled } from 'styled-components';

const ExploreCollectivesContent = () => {
    return(
        <Content>
            <h2>Explore Collectives is coming soon!</h2>
            <div>We are working hard to get Explore Collectives ready for you.</div>
        </Content>
    );
}
export default ExploreCollectivesContent;

const Content = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    h2 {
        font-size: 2rem;
        margin:1rem;
    }
    div {
        color: var(--color-gray);
        margin:1rem;
    }
`;
