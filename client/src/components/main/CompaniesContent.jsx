import { styled } from 'styled-components';

const CompaniesContent = () => {
    return(
        <Content>
            <h2>Companies is coming soon!</h2>
            <div>We are working hard to get Companies ready for you.</div>
        </Content>
    );
}
export default CompaniesContent;

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
