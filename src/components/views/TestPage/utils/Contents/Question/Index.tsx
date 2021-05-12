import React, { useEffect, useState } from 'react'
import Box from './utils/Box'
import styled from 'styled-components'
import socketio from 'socket.io-client'

const QuestionContainer = styled.div`
width : 100%;
height : 37vh;
overflow-y : scroll;
::-webkit-scrollbar {
    display: none;
}
`
const ChatContentCnt = styled.div`
width : 100%;
height : 31vh;
overflow-y : scroll;
::-webkit-scrollbar {
    display: none;
}
`
const ChatInputCnt = styled.div`
width : 100%;
height : 5vh;
display : flex;
justify-content : space-between;
align-items : center;
`
const ChatInput = styled.input`
width: 80%;
border: 1px solid #D4D4D4; 
border-radius: 5px;
`
const ChatSubmitBtn = styled.button`
font-size :8px;
width : 20%;
text-align : center;
font-weight : bold;
color : #A6C5F3;
`

function Index(props:any) {
    const socket = props.socket;

    const [qNum, setqNum] = useState<number>(0);

    const [questions, setquestions] = useState<Array<any>>([]);

    function mySubmit() {
        console.log('button');
        const qInput = document.querySelector('#qInput') as HTMLInputElement;
        console.log(qInput.value);
        if (qInput.value) {
            socket.emit('question', {
                content : qInput.value,
                qNum : qNum
            })
            setquestions(questions.concat([<Box qNum = {qNum}socket = {socket} msg={qInput.value}></Box>]));
        }
        setqNum(qNum+1);
    }

    useEffect(() => {
        socket.on('sendQ', (data:any)=>{
            setquestions(questions.concat([<Box qNum = {data.qNum} socket = {socket} msg={data.content}></Box>]));
            setqNum(qNum+1);
        })
    }, [questions])

    return (
        <QuestionContainer>
            <ChatContentCnt>
                {questions}
            </ChatContentCnt>
            <ChatInputCnt>
                <ChatInput id="qInput" type="TextArea" placeholder="채팅내용을 입력해주세요" />
                <ChatSubmitBtn onClick={mySubmit}>내전송</ChatSubmitBtn>
            </ChatInputCnt>
        </QuestionContainer>
    )
}

export default Index
