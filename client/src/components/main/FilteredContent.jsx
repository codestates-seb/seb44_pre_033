import { styled } from 'styled-components';
import ProfileImg from '../../assets/profile.png';
import { useState } from 'react';
import Pagenation from './Pagenation';
import { Link } from "react-router-dom";

const FilteredContent = ({questions, filter})=>{
    const [page, setPage] = useState(1); //페이지
    const limit = 10; // posts가 보일 최대한의 갯수
    const offset = (page-1)*limit; // 시작점과 끝점을 구하는 offset


    const postsData = (posts) => {
        if(posts){
        let result = posts.slice(offset, offset + limit);
        return result;
        }
    }

    // filter
    const newestFilter=(posts)=>{
        if(posts){
            let result = posts.sort((a,b)=>{
                return b.id-a.id;
            });
            return result;
            }
    }

    const oldestFilter=(posts)=>{
        if(posts){
            let result = posts.sort((a,b)=>{
                return a.id-b.id;
            });
            return result;
            }
    }

    const hottestFilter=(posts)=>{
        if(posts){
            let result = posts.sort((a,b)=>{
                return b.votes-a.votes;
            });
            return result;
            }
    }

    const chooseFilter = (filter,posts) => {
        if(filter==='Newest'){
            return newestFilter(posts);
        }
        else if(filter==='Oldest'){
            return oldestFilter(posts);
        }
        else if(filter==='Hottest'){
            return hottestFilter(posts);
        }
        else {
            return newestFilter(posts);
        }
    }

    const filteredQuestions = chooseFilter(filter,questions);
    //////////////////////
    const totalPosts=questions.length;

    const onClickPage = (num)=>{
        setPage(num);
    }

    // 태그를 제거하는 정규식
    const removeTags = (str)=>{
        return str.toString().replace(/<[^>]*>/g,"");
    }
    
    return(
        <ContentContainer>
            {postsData(filteredQuestions).map((question)=>{
                return(<article key={question.id}>
                    <ContentRate>
                        <div>{question.votes}  votes</div>
                        <div>2  answers</div>
                        <div>3  views</div>
                    </ContentRate>
                    <ContentText>
                        <ContentTextTitle title={question.title} path={`/detail/${question.id}`}/>
                        <ContentTextContent>
                            {removeTags(question.content)}
                        </ContentTextContent>
                        <ContentInfo>
                            <div>label</div>
                            <Profile userId={question.userId} modifiedAt={question.modifiedAt}/>
                        </ContentInfo>
                    </ContentText>
                </article>);
                
            })}
            <Pagenation limit={limit} page={page} totalPosts={totalPosts} onClickPage={onClickPage}/>
        </ContentContainer>
            
            
    );
}
export default FilteredContent;

const ContentTextTitle = ({title, path})=>{
    return(
        <Link to={path}>
            <Title>
                {title}
            </Title>
        </Link>
    );  
}

const ContentContainer = styled.div`
    article {
        border-bottom: 0.05rem solid var(--color-gray);
        padding: 1.5rem;
        display:flex;
        flex-direction: row;
    }
`;

const ContentRate = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    width:10rem;
    padding: 0 1rem;
`;


const ContentText = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
`;

const Title = styled.div`
    font-size: 1.2rem;
    padding: 0.5rem 0;
    color: var(--color-blue);
`;

const ContentTextContent = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    
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