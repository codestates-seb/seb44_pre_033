import { styled } from 'styled-components';
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <NavContainer>
            <Home>
                <Title>
                    Home
                </Title>

            </Home>
            <Public>
                <Title>
                    PUBLIC
                </Title>
                <Content>
                    <ContentTitle>
                        Questions
                    </ContentTitle>
                    <ContentTitle>
                        Tags
                    </ContentTitle>
                    <ContentTitle>
                        Users
                    </ContentTitle>
                    <ContentTitle>
                        Companies
                    </ContentTitle>
                </Content>
            </Public>
            <Collectives>
                <Title>
                    COLLECTIVES
                </Title>
                <Content>
                    <ContentTitle>
                        Explore Collectives
                    </ContentTitle>
                </Content>
            </Collectives>
            <Teams>
                <Title>
                    TEAMS
                </Title>
                <Content>
                    <ContentTitle>
                        Create free Team
                    </ContentTitle>
                </Content>
            </Teams>
            <LookingForTeam>
                <Button>Looking for your Teams?</Button>
            </LookingForTeam>
        </NavContainer>
    );
};

const NavContainer = styled.nav`
    display:flex;
    flex-direction: column;
    border-right: 0.05rem solid var(--color-gray);
    max-width:16rem;
    min-width:14rem;
    padding-top: 1rem;
    padding-left:3rem;
    position:sticky;
    left:0;
`;

const Container = styled.div`
    /* width: 5rem; */
    padding:0.4rem 0;
    font-size: 0.9rem;
    min-width: 11rem;
    /* border-width: 0 0.2rem 0 0;
    border-style: solid;
    border-color: var(--color-orange);
    background-color: var(--color-gray); */
`;

const Home = styled(Container)`

`;

const Public = styled(Container)`

`;

const Collectives = styled(Container)`

`;

const Teams = styled(Container)`

`;

const LookingForTeam = styled(Container)`

`;

const Title = styled(Container)`
    color: var(--color-gray);
`;

const Content = styled(Container)`

`;

const ContentTitle = styled(Container)`
    color: var(--color-gray);
    padding-left:2rem;

`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10rem; 
    height: 1.8rem;
    padding: 0.5rem;
    font-size: 0.7rem;
    border-radius: 4px;

    background-color: 	#e1ecf4;
    color: 	#39739d;
    /* border: 1px solid 	#7aa7c7; */
    &:hover {
        background-color: #0063bf;
    }
    a{
        color:     #39739d;
    }
`;