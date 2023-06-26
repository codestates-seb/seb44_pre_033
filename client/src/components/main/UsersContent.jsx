import { styled } from 'styled-components';

const UsersContent = () => {
    return(
        <Content>
            <h2>Users is coming soon!</h2>
            <div>We are working hard to get Users ready for you.</div>
        </Content>
    );
}
export default UsersContent;

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
