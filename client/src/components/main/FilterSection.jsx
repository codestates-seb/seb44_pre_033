import { styled } from 'styled-components';



const FilterSection = ()=>{

    

    const onChangeFilter = ()=>{
        
    }

    return (
        <SectionContainer>
            <NumOfQuestion> 123,456,789 Questions</NumOfQuestion>
            <FilterList>
                <FilterCondition>
                    <Button>Newest</Button>
                    <Button>Oldest</Button>
                    <Button>Hottest</Button>
                </FilterCondition>
                <FilterButton>Filter</FilterButton>
            </FilterList>
        </SectionContainer>
    );
}
export default FilterSection;

const SectionContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1.5rem 0;
`;

const NumOfQuestion = styled.div`
    font-size:1.2rem;
    padding:0.5rem;
`;

const FilterList = styled.div`
    display:flex;
    flex-direction: row;
`;

const FilterCondition = styled.div`
    display:flex;
    flex-direction: row;
    border:0.05rem solid var(--color-gray);
    border-radius: 0.3rem;
`;

const Button = styled.button`
    padding:0.5rem;
    border:0.05rem solid var(--color-gray);
`;

const FilterButton = styled.div`
    margin: 0 1rem;
    padding:0.5rem;
    border: 0.05rem solid var(--color-gray);
    border-radius: 0.3rem
`;