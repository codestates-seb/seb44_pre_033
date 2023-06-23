import { styled } from 'styled-components';
import UserInfo from '../common/UserInfo';
import ProfileImg from '../../assets/profile.png';
import axios from 'axios';
import { useState, useEffect } from 'react';



const FilteredContent = ()=>{
    const [questions, setQuestions]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3000/questions')
        .then((res)=>console.log(res.data))
        // .then((data)=> setQuestions(data))
        .catch(() => {
            console.error('데이터를 가져오는 중에 문제가 발생했어요.');
          });
    },[]);
    
    return(
        <ContentContainer>
            
        {questions.map(({id,title,content,createdAt,modifiedAt,name,userId,votes})=>{
            <article key={id}>
                <ContentRate>
                    <div>{votes}  votes</div>
                    <div>2  answers</div>
                    <div>3  views</div>
                </ContentRate>
                <ContentText>
                    <ContentTextTitle>
                        {title}
                    </ContentTextTitle>
                    <div>
                        {content}
                    </div>
                    <ContentInfo>
                        <div>label</div>
                        <Profile userId={userId} modifiedAt={modifiedAt}/>
                    </ContentInfo>
                </ContentText>
            </article>
                
            })}
            </ContentContainer>
            
            
    );
}
export default FilteredContent;

const ContentContainer = styled.div`
    border-bottom: 0.05rem solid var(--color-gray);
    
    padding: 1.5rem;
    article{
        display:flex;
        flex-direction: row;
    }
`;

const ContentRate = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    flex-basis:10rem;
    padding: 0 1rem;
`;


const ContentText = styled.div`
    display: flex;
    flex-direction: column;
`;

const ContentTextTitle = styled.div`
    font-size: 1.2rem;
    padding: 0.5rem 0;
`;

const ContentInfo = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0.5rem 0 ;
`;

const Profile = ({userId,modifiedAt})=>{
    return (
        <ProfileContainer>
            <ProfileImage src={ProfileImg}></ProfileImage>
            <div>{userId}</div>
            <div>{modifiedAt}</div>
        </ProfileContainer>
        
    );
}

const ProfileContainer = styled.div`
    display:flex;
    flex-direction: row;
    div{
        margin:0 0.5rem;
    }
`;

const ProfileImage = styled.img`
    width: 1rem;
    height:1rem;
`;