import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'

const Container = styled.div`
width : 100%;
height : 100%;
display :flex;
align-items : center;
justify-content : center;
`

const Box = styled.div`
text-align : center;
`

const Title = styled.div`
font-size : 37px;
`
const Desc = styled.div`
font-size : 20px;
color : ${props => props.theme.color.gray1};
margin-bottom : 10px;
`
const LinkBox = styled.div`
width : 650px;
height : 80px;
background-color :white;
border-radius : 10px;
border : 1px solid ${props => props.theme.color.gray7};
box-shadow : 10px 5px 5px ${props => props.theme.color.gray7};
padding : 1.5rem;
display : flex;
align-items : center;
justify-content : center;
margin-bottom : 15px;
`

const Link = styled.div`
border-bottom : 1px solid black;
width : 80%;
display : flex;
justify-content : space-between;
align-items : center;
`

const SubmitBtn = styled.button`
width : 200px;
height : 50px;
background-color : ${props => props.theme.color.blue};
border : none;
color : white;
`

const Input = styled.input`
border : none;
width : 90%;
border-bottom : 1px solid black;
`

function Index() {
    const [code, setCode] = useState('');

    const onChangeCode = (e) => {
        setCode(e.target.value);
        console.log(code);
    }

    const submitHandler = () => {
        axios.put('/api/subject/join', 
        { 
            code : code
         })
         .then((response)=>{
             const result = response.data;
             console.log(result);
             alert(result.subject.name + "에 성공적으로 참여하였습니다.");
             return window.location.href = '/main';
         })
         .catch((response)=>{
             console.log('Error!');
             console.log(response);
         });
    }


    return (
        <Container>
            <Box>
                <Title>강의 참여</Title>
                <Desc>아래 링크를 통해 강의에 참여하세요</Desc>
                <LinkBox>
                    <Input placeholder = "링크를 입력하세요" onChange={onChangeCode}/>
                </LinkBox>
                <SubmitBtn onClick={submitHandler}>강의 참여</SubmitBtn>
            </Box>
        </Container>
    )
}

export default Index
