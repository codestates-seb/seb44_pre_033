import { styled } from 'styled-components';

const FilterSection = ({onChangeFilter, questions})=>{

    return (
        <SectionContainer>
            <NumOfQuestion> {questions.length} Questions</NumOfQuestion>
            <FilterList>
                <FilterCondition>
                    <Button value='Oldest' onClick={onChangeFilter}>Oldest</Button> 
                    <Button value='Newest' onClick={onChangeFilter}>Newest</Button>
                    <Button value='Hottest' onClick={onChangeFilter}>Hottest</Button>
                </FilterCondition>
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

